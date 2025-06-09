import { useMemo, memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import venezuelaTopoJson from './venezuelaState.json' with { type: 'json' }
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { useGetLocationMonitoringDashboardByState } from '@/core/locations/locationMonitoring/infra/hook/useGetLocationMonitoringDashboardByState'
import { LoadingSpinner } from './LocationMonitoringChart'
import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipPortal,
	TooltipProvider,
	TooltipTrigger
} from '@/components/Tooltip'

const COLOR_THRESHOLDS = [
	{ threshold: 80, color: '#22c55e', label: '80-100%' }, // Green (high)
	{ threshold: 60, color: '#eab308', label: '60-79%' }, // Yellow (medium)
	{ threshold: 40, color: '#f97316', label: '40-59%' }, // Orange (medium-low)
	{ threshold: 0, color: '#ef4444', label: '0-39%' } // Red (low)
]

const NO_DATA_COLOR = '#D3D3D3' // Gray for states without data
const NO_EQUIPMENT_COLOR = '#f1f5f9' // Light gray for states with 0 total equipment

export const MapChart = memo(() => {
	const { locationMonitoringDashboardByState, isError, isLoading, error } =
		useGetLocationMonitoringDashboardByState()

	// Memoize the data processing to avoid re-calculating on every render
	const processedStateData = useMemo(() => {
		if (!locationMonitoringDashboardByState?.byState) {
			return {}
		}

		const data: Record<string, number> = {}
		locationMonitoringDashboardByState.byState.forEach(state => {
			// Handle division by zero for total = 0
			const percentage = state.total > 0 ? (state.onlineCount * 100) / state.total : -1 // Use -1 for no equipment
			data[state.stateName] = percentage
		})
		return data
	}, [locationMonitoringDashboardByState]) // Recalculate only when locationMonitoringDashboardByState changes

	// Memoize the getColor function to prevent re-creation on every render
	const getColor = useMemo(() => {
		return (stateName: string) => {
			const percentage = processedStateData[stateName]

			if (percentage === undefined) {
				return NO_DATA_COLOR // Gray for states not in data (e.g., no monitoring info for that state)
			}
			if (percentage === -1) {
				return NO_EQUIPMENT_COLOR // Specific color for states with 0 total equipment
			}

			// Find the first threshold that the percentage meets
			for (const thresholdItem of COLOR_THRESHOLDS) {
				if (percentage >= thresholdItem.threshold) {
					return thresholdItem.color
				}
			}
			return NO_DATA_COLOR // Fallback, though typically covered by the 0% threshold
		}
	}, [processedStateData]) // Recalculate only when processedStateData changes

	if (isLoading || !locationMonitoringDashboardByState) {
		return <LoadingSpinner />
	}

	if (isError) {
		return (
			<Card className="flex h-full items-center justify-center md:min-h-[560px]">
				<div className="text-rojo-600 p-8 text-center" role="alert" aria-live="assertive">
					<p>¡Ups! Hubo un error al cargar la información del mapa.</p>
					<p>Detalles: {error?.message || 'Error desconocido'}</p>
					<p>Por favor, intenta de nuevo más tarde.</p>
				</div>
			</Card>
		)
	}

	// Handle case where no data is returned but no error
	if (
		!locationMonitoringDashboardByState ||
		locationMonitoringDashboardByState.byState.length === 0
	) {
		return (
			<Card className="flex h-full items-center justify-center md:min-h-[560px]">
				<div className="p-8 text-center text-gray-500">
					<p className="mb-2 text-lg font-semibold">
						No hay datos de monitoreo de ubicaciones disponibles.
					</p>
					<p>Verifica si hay equipos configurados para monitoreo.</p>
				</div>
			</Card>
		)
	}

	return (
		<Card className="flex h-full flex-col md:min-h-[560px]">
			<CardHeader>
				<CardTitle>Mapa de Venezuela - Estado de Equipos por Estado</CardTitle>
				<CardDescription>
					El porcentaje representa los equipos online sobre el total en cada estado.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow">
				<div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-3">
					{/*  Map */}
					<div className="flex items-center justify-center lg:col-span-2">
						<div className="relative h-full w-full overflow-hidden rounded-lg border bg-slate-50">
							<ComposableMap
								projection="geoMercator" // O el que mejor se adapte a Venezuela
								projectionConfig={{
									scale: 3000, // Ajusta la escala para que Venezuela ocupe bien el espacio
									center: [-66.59, 6.5] // Ajusta el centro de Venezuela
								}}
								height={650}
								width={800}
							>
								<Geographies geography={venezuelaTopoJson}>
									{({ geographies }) =>
										geographies.map(geo => {
											const stateName = geo?.properties.NAME_1 // O la propiedad que contenga el nombre del estado
											const percentage = processedStateData[stateName]
											const displayPercentage =
												percentage !== undefined && percentage !== -1
													? `${percentage.toFixed(0)}%`
													: percentage === -1
														? '0 equipos'
														: 'Sin datos' // Format for display

											return (
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<Geography
																key={geo.rsmKey}
																geography={geo}
																fill={getColor(stateName)}
																stroke="#FFFFFF"
																strokeWidth={0.5}
																style={{
																	default: { outline: 'none' },
																	hover: {
																		outline: 'none',
																		stroke: '#000000',
																		strokeWidth: 1.0
																	}, // Highlight on hover
																	pressed: { outline: 'none' }
																}}
															/>
														</TooltipTrigger>
														<TooltipPortal>
															<TooltipContent
																className="TooltipContent bg-azul-800 rounded px-3 py-1.5 text-sm text-white shadow-lg"
																sideOffset={5}
															>
																{`${stateName}: ${displayPercentage}`}
																<TooltipArrow className="TooltipArrow fill-gray-800" />
															</TooltipContent>
														</TooltipPortal>
													</Tooltip>
												</TooltipProvider>
											)
										})
									}
								</Geographies>
							</ComposableMap>
							{/* Legend */}
							<div className="absolute bottom-4 left-4 rounded-lg border bg-white p-3 shadow-md">
								<h4 className="mb-2 text-sm font-medium">
									Estado de Equipos (Online %)
								</h4>
								<div className="space-y-1 text-xs">
									{COLOR_THRESHOLDS.map((item, index) => (
										<div key={index} className="flex items-center gap-2">
											<div
												className="h-4 w-4 rounded"
												style={{ backgroundColor: item.color }}
											></div>
											<span>{item.label}</span>
										</div>
									))}
									<div className="flex items-center gap-2">
										<div
											className="h-4 w-4 rounded"
											style={{ backgroundColor: NO_EQUIPMENT_COLOR }}
										></div>
										<span>0 equipos</span>
									</div>
									<div className="flex items-center gap-2">
										<div
											className="h-4 w-4 rounded"
											style={{ backgroundColor: NO_DATA_COLOR }}
										></div>
										<span>Sin datos</span>
									</div>
								</div>
							</div>
							{/* <div className="absolute bottom-4 left-4 rounded-lg border bg-white p-3 shadow-md">
								<h4 className="mb-2 text-sm font-medium">
									Estado de Equipos (Online %)
								</h4>
								<div className="space-y-1 text-xs">
									<div className="flex items-center gap-2">
										<div
											className="h-4 w-4 rounded"
											style={{ backgroundColor: '#22c55e' }}
										></div>
										<span>80-100%</span>
									</div>
									<div className="flex items-center gap-2">
										<div
											className="h-4 w-4 rounded"
											style={{ backgroundColor: '#eab308' }}
										></div>
										<span>60-79%</span>
									</div>
									<div className="flex items-center gap-2">
										<div
											className="h-4 w-4 rounded"
											style={{ backgroundColor: '#f97316' }}
										></div>
										<span>40-59%</span>
									</div>
									<div className="flex items-center gap-2">
										<div
											className="h-4 w-4 rounded"
											style={{ backgroundColor: '#ef4444' }}
										></div>
										<span>0-39%</span>
									</div>
									<div className="flex items-center gap-2">
										<div
											className="h-4 w-4 rounded"
											style={{ backgroundColor: '#f1f5f9' }}
										></div>
										<span>Sin equipos</span>
									</div>
								</div>
							</div> */}
						</div>
					</div>
				</div>
				{/* Placeholder for State Details / Other Widgets */}
				<div className="rounded-lg border bg-gray-50 p-4 lg:col-span-1">
					<h3 className="mb-2 text-lg font-semibold">Detalles del Estado</h3>
					<p className="text-sm text-gray-600">
						Aquí se mostrarán detalles adicionales al seleccionar un estado en el mapa.
					</p>
					{/* You can add components here to display state-specific data */}
				</div>
			</CardContent>
		</Card>
	)
})

MapChart.displayName = 'MapChart'
