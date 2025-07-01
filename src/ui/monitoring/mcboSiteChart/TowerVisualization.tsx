import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/Tooltip'
import { COLOR_THRESHOLDS } from '../MapColors'
import { type Locations } from '@/core/devices/deviceMonitoring/domain/dto/DeviceMonitoringDashboardByLocation.dto'
import { cn } from '@/lib/utils'
import Typography from '@/components/Typography'

const getLocationStatus = (location: Locations) => {
	const onlinePercentage = location.total > 0 ? (location.onlineCount / location.total) * 100 : 0
	return {
		...COLOR_THRESHOLDS.find(level => onlinePercentage >= level.threshold)!,
		onlinePercentage
	}
}

interface SiteBuildingViewProps {
	locations: Locations[]
	selectedLocationName: string | null
	onLocationClick: (name: string) => void
}

export const TowerVisualization = ({
	locations,
	selectedLocationName,
	onLocationClick
}: SiteBuildingViewProps) => {
	return (
		<TooltipProvider>
			<figure className="flex flex-col items-center gap-y-4 p-2">
				<div className="w-fit">
					<div className="h-3 rounded-t-md bg-slate-600 shadow-inner" />

					<div className="overflow-hidden rounded-b-md border-2 border-slate-500 bg-slate-200">
						{locations
							.sort((a, b) => {
								const regex = /Piso (\d+)$/
								const matchA = a.name.match(regex)
								const numA = matchA ? parseInt(matchA[1], 10) : NaN

								const matchB = b.name.match(regex)
								const numB = matchB ? parseInt(matchB[1], 10) : NaN

								if (!isNaN(numA) && !isNaN(numB)) {
									return numB - numA
								}

								return b.name.localeCompare(a.name)
							})
							.map(location => {
								const { color, onlinePercentage } = getLocationStatus(location)
								const isSelected = selectedLocationName === location.name

								return (
									<Tooltip key={location.name}>
										<TooltipTrigger asChild>
											<button
												type="button"
												onClick={() => onLocationClick(location.name)}
												aria-label={`Seleccionar ubicación: ${location.name}. Estado: ${onlinePercentage.toFixed(0)}% de equipos online.`}
												style={{
													backgroundColor: color
												}}
												className={cn(
													'flex h-10 w-full cursor-pointer items-center justify-between gap-4 px-3 text-white transition-all duration-300 ease-in-out',
													{
														'opacity-50 hover:opacity-100':
															selectedLocationName !== null &&
															!isSelected,
														'scale-105 ring-2 ring-blue-500 ring-offset-2':
															isSelected,
														'hover:scale-105 hover:shadow-lg':
															!isSelected
													}
												)}
											>
												<Typography
													variant="span"
													weight="bold"
													option="tiny"
												>
													{location.name}
												</Typography>
												<Typography
													variant="span"
													weight="semibold"
													option="tiny"
												>
													{onlinePercentage.toFixed(0)}%
												</Typography>
											</button>
										</TooltipTrigger>
										<TooltipContent side="right">
											<div className="p-2">
												<p className="font-semibold">{location.name}</p>
												<p className="text-sm">
													Total: {location.total} equipos
												</p>
												<p className="text-sm text-green-600">
													Online: {location.onlineCount}
												</p>
												<p className="text-sm text-red-600">
													Offline: {location.offlineCount}
												</p>
											</div>
										</TooltipContent>
									</Tooltip>
								)
							})}
					</div>

					<div className="mt-1 h-4 rounded-b-lg bg-slate-700 shadow-md" />
				</div>
			</figure>
		</TooltipProvider>
	)
}
