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

// Define props interface for claritys
interface MapDisplayProps {
	venezuelaGeo: object // The TopoJSON/GeoJSON data
	processedStateData: Record<string, StateData>
	getColor: (stateName: string) => string
	handleStateClick: (stateName: string) => void
}

export const MapDisplay = memo(
	({ venezuelaGeo, processedStateData, getColor, handleStateClick }: MapDisplayProps) => {
		return (
			<div className="relative h-full w-full rounded-lg border bg-slate-50">
				{/* IMPORTANT: The style here should ensure the SVG scales within its parent.
                  The parent div MUST have a defined height and width for h-full/w-full to work.
                  react-simple-maps by default will try to take 100% of its container.
                  If the map still overflows, check the parent chain's heights (CardContent, Card, and the grid div).
                  You might need a fixed height for the map container or ensure flex/grid items stretch correctly.
                */}
				<ComposableMap
					projection="geoMercator"
					projectionConfig={{
						scale: 2800, // Adjust scale to fit Venezuela well
						center: [-66.59, 6.5] // Adjust center of Venezuela
					}}
					// Ensure the SVG itself scales to fill its container
					// The default behavior of react-simple-maps is to fill its parent,
					// but sometimes explicit sizing helps, especially if the parent doesn't have intrinsic dimensions.
					// If you have a specific aspect ratio, you might use viewBox or manage width/height differently.
					// For h-full w-full, you often don't need these explicit styles, but it depends on parent setup.
					// Consider setting a specific height for the parent div if 'h-full' isn't sufficient.
					className="h-full w-full" // Ensure SVG takes full height/width of its container
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

				<MapLegend />
			</div>
		)
	}
)

MapDisplay.displayName = 'MapDisplay'
