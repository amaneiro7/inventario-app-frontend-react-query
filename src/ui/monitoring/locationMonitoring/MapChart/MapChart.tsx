import { lazy, memo, Suspense } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { useMapChart } from './useMapChart'
import venezuelaTopoJson from './venezuelaState.json' with { type: 'json' }

import { LoadingSpinner } from '../LocationMonitoringChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import {
	Tooltip,
	TooltipContent,
	TooltipPortal,
	TooltipProvider,
	TooltipTrigger
} from '@/components/Tooltip'

const MapLegend = lazy(() => import('./MapLegend').then(m => ({ default: m.MapLegend })))
const StateDetailsPanel = lazy(() =>
	import('./StateDetailsPanel').then(m => ({ default: m.StateDetailsPanel }))
)

export const MapChart = memo(() => {
	const {
		locationMonitoringDashboardByState,
		isError,
		isLoading,
		error,
		getColor,
		handleStateClick,
		selectedState,
		processedStateData
	} = useMapChart()

	if (isLoading || !processedStateData || !locationMonitoringDashboardByState) {
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
											const percentage =
												processedStateData[stateName]?.percentage
											const displayPercentage =
												percentage !== undefined && percentage !== -1
													? `${percentage.toFixed(0)}%`
													: percentage === -1
														? '0 equipos'
														: 'Sin datos' // Format for display

											return (
												<TooltipProvider key={geo.rsmKey}>
													<Tooltip>
														<TooltipTrigger asChild>
															<Geography
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
																onClick={() =>
																	handleStateClick(stateName)
																}
															/>
														</TooltipTrigger>
														<TooltipPortal>
															<TooltipContent
																className="TooltipContent rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm text-black shadow-lg"
																sideOffset={5}
															>
																{`${stateName}: ${displayPercentage}`}
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
							<Suspense>
								<MapLegend />
							</Suspense>
						</div>
					</div>
					{/* Pandel de Información */}
					<Suspense>
						<StateDetailsPanel
							getColor={getColor}
							selectedState={selectedState}
							stateStats={processedStateData}
						/>
					</Suspense>
				</div>
			</CardContent>
		</Card>
	)
})

MapChart.displayName = 'MapChart'
