import { memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import {
	Tooltip,
	TooltipContent,
	TooltipPortal,
	TooltipProvider,
	TooltipTrigger
} from '@/components/Tooltip' // Adjust path if needed
import { StateData } from './locationMonitoring/MapChart/useMapChart'
import { MapLegend } from './locationMonitoring/MapChart/MapLegend'
import { MapLegendTotal } from './locationMonitoring/MapChart/MapLegendTotal'

// Define props interface for claritys
interface MapDisplayProps {
	venezuelaGeo: object // The TopoJSON/GeoJSON data
	processedStateData: Record<string, StateData>
	getColor: (stateName: string) => string
	handleStateClick: (stateName: string) => void
}

export const MapDisplay = memo(
	({ venezuelaGeo, processedStateData, getColor, handleStateClick }: MapDisplayProps) => {
		const MAP_CENTER: [number, number] = [-66.59, 5.8]
		const MAP_SCALE = 2500

		return (
			<div className="relative h-full w-full overflow-hidden rounded-lg border bg-slate-100 shadow-xl">
				<ComposableMap
					projection="geoMercator"
					role="img"
					aria-label="Mapa interactivo de Venezuela mostrando el estado de equipos por estado"
					projectionConfig={{
						scale: MAP_SCALE,
						center: MAP_CENTER
					}}
				>
					<Geographies geography={venezuelaGeo}>
						{({ geographies }) =>
							geographies.map(geo => {
								const stateName = geo?.properties.NAME_1 // Ensure this matches your GeoJSON
								const stateStats = processedStateData[stateName]
								const percentage = stateStats?.percentage
								const onlineCount = stateStats?.onlineCount
								const offlineCount = stateStats?.offlineCount
								const totalCount = stateStats?.total

								// Improved display format for tooltip content
								const displayPercentage =
									percentage !== undefined && percentage !== -1
										? `${percentage.toFixed(0)}%`
										: percentage === -1
											? '0 equipos'
											: 'Sin datos' // Handle 'Sin datos' for missing states

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
													onClick={() => handleStateClick(stateName)}
												/>
											</TooltipTrigger>
											<TooltipPortal>
												<TooltipContent
													className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm text-black shadow-lg"
													sideOffset={5}
												>
													<div className="font-semibold">{stateName}</div>
													<div>
														Porcentaje Online: {displayPercentage}
													</div>
													{onlineCount !== undefined && (
														<div>Online: {onlineCount}</div>
													)}
													{offlineCount !== undefined && (
														<div>Offline: {offlineCount}</div>
													)}
													{totalCount !== undefined && (
														<div>Total: {totalCount}</div>
													)}
													{/* {`${stateName}: ${displayPercentage}`} */}
												</TooltipContent>
											</TooltipPortal>
										</Tooltip>
									</TooltipProvider>
								)
							})
						}
					</Geographies>
				</ComposableMap>

				<MapLegendTotal />
				<MapLegend />
			</div>
		)
	}
)

MapDisplay.displayName = 'MapDisplay'
