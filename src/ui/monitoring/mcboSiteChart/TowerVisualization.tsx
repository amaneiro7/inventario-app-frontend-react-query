import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COLOR_THRESHOLDS } from '../MapColors'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/Tooltip'
import Typography from '@/components/Typography'
import { type Locations } from '@/core/devices/deviceMonitoring/domain/dto/DeviceMonitoringDashboardByLocation.dto'

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
	onLocationClick: (name: string | null) => void
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

					<div className="rounded-b-md border-2 border-slate-500 bg-slate-200">
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
													'relative flex h-10 w-full cursor-pointer items-center justify-between gap-4 px-3 text-white transition-all duration-300 ease-in-out',
													{
														'scale-110 rounded border border-black shadow-lg':
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
													className="text-shadow"
												>
													{location.name}
												</Typography>
												<Typography
													variant="span"
													weight="semibold"
													option="tiny"
													className="text-shadow"
												>
													{onlinePercentage.toFixed(0)}%
												</Typography>
												{isSelected && (
													<ArrowLeft className="text-naranja absolute -right-6 h-4 w-5" />
												)}
											</button>
										</TooltipTrigger>
										<TooltipContent side="right">
											<div className="p-2">
												<Typography
													variant="p"
													option="small"
													weight="semibold"
												>
													{location.name}
												</Typography>
												<Typography variant="p" option="tiny">
													Total: {location.total} equipos
												</Typography>
												<Typography variant="p" option="tiny" color="verde">
													En línea: {location.onlineCount}
												</Typography>
												<Typography variant="p" option="tiny" color="rojo">
													Fuera de línea: {location.offlineCount}
												</Typography>
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
