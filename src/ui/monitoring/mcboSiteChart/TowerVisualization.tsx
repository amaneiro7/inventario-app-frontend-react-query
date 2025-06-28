import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/Tooltip'

interface FloorStats {
	locationName: string
	onlineCount: number
	offlineCount: number
	total: number
	percentage: number
	// departments: Set<string>
}

interface TowerVisualizationProps {
	floorStats: FloorStats[]
	selectedFloor: string | null
	onFloorClick: (locationName: string) => void
}

export const TowerVisualization = ({
	floorStats,
	selectedFloor,
	onFloorClick
}: TowerVisualizationProps) => {
	const getFloorColor = (floor: FloorStats) => {
		const onlinePercentage = (floor.onlineCount / floor.total) * 100

		if (onlinePercentage >= 90) return '#10b981' // Verde intenso
		if (onlinePercentage >= 75) return '#34d399' // Verde claro
		if (onlinePercentage >= 50) return '#fbbf24' // Amarillo
		if (onlinePercentage >= 25) return '#fb923c' // Naranja
		return '#ef4444' // Rojo
	}

	const getFloorOpacity = (floor: FloorStats) => {
		return selectedFloor === null || selectedFloor === floor.locationName ? 1 : 0.5
	}

	return (
		<TooltipProvider>
			<div className="flex flex-col items-center space-y-2 p-4">
				{/* Torre */}
				<div className="relative">
					{/* Techo de la torre */}
					<div className="mx-auto mb-1 h-4 w-32 rounded-t-lg bg-gray-600"></div>

					{/* Pisos de la torre */}
					<div className="overflow-hidden rounded-b-lg border-2 border-gray-400 bg-gray-100">
						{floorStats.map(floor => {
							const onlinePercentage = (floor.onlineCount / floor.total) * 100

							return (
								<Tooltip key={floor.locationName}>
									<TooltipTrigger asChild>
										<div
											className="flex h-12 w-32 cursor-pointer items-center justify-between border-b border-gray-300 px-3 transition-all duration-200 hover:shadow-md"
											style={{
												backgroundColor: getFloorColor(floor),
												opacity: getFloorOpacity(floor),
												transform:
													selectedFloor === floor.locationName
														? 'scale(1.05)'
														: 'scale(1)',
												border:
													selectedFloor === floor.locationName
														? '2px solid #3b82f6'
														: '1px solid #d1d5db'
											}}
											onClick={() => onFloorClick(floor.locationName)}
										>
											<span className="text-sm font-bold text-white">
												{floor.locationName}
											</span>
											<span className="text-xs text-white">
												{onlinePercentage.toFixed(0)}%
											</span>
										</div>
									</TooltipTrigger>
									<TooltipContent side="right">
										<div className="p-2">
											<p className="font-semibold">{floor.locationName}</p>
											<p className="text-sm">Total: {floor.total} equipos</p>
											<p className="text-sm text-green-600">
												Online: {floor.onlineCount}
											</p>
											<p className="text-sm text-red-600">
												Offline: {floor.offlineCount}
											</p>
											{/* <p className="text-sm">
												Departamentos:{' '}
												{Array.from(floor.departments).join(', ')}
											</p> */}
										</div>
									</TooltipContent>
								</Tooltip>
							)
						})}
					</div>

					{/* Base de la torre */}
					<div className="mx-auto mt-1 h-6 w-36 rounded-b-xl bg-gray-700"></div>
				</div>

				{/* Leyenda de colores */}
				<div className="mt-6 rounded-lg border bg-white p-4">
					<h4 className="mb-3 text-sm font-semibold">Porcentaje de Equipos Online</h4>
					<div className="flex flex-wrap gap-2 text-xs">
						<div className="flex items-center gap-1">
							<div
								className="h-4 w-4 rounded"
								style={{ backgroundColor: '#10b981' }}
							></div>
							<span>90-100%</span>
						</div>
						<div className="flex items-center gap-1">
							<div
								className="h-4 w-4 rounded"
								style={{ backgroundColor: '#34d399' }}
							></div>
							<span>75-89%</span>
						</div>
						<div className="flex items-center gap-1">
							<div
								className="h-4 w-4 rounded"
								style={{ backgroundColor: '#fbbf24' }}
							></div>
							<span>50-74%</span>
						</div>
						<div className="flex items-center gap-1">
							<div
								className="h-4 w-4 rounded"
								style={{ backgroundColor: '#fb923c' }}
							></div>
							<span>25-49%</span>
						</div>
						<div className="flex items-center gap-1">
							<div
								className="h-4 w-4 rounded"
								style={{ backgroundColor: '#ef4444' }}
							></div>
							<span>0-24%</span>
						</div>
					</div>
				</div>
			</div>
		</TooltipProvider>
	)
}
