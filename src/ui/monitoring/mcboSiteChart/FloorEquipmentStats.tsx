import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { Building, Users, Power, PowerOff } from 'lucide-react'

interface FloorStats {
	floor: number
	totalEquipment: number
	onlineEquipment: number
	offlineEquipment: number
	departments: Set<string>
}

interface FloorEquipmentStatsProps {
	selectedFloor: FloorStats | null
	allFloors: FloorStats[]
}

export const FloorEquipmentStats = ({ selectedFloor, allFloors }: FloorEquipmentStatsProps) => {
	if (!selectedFloor) {
		return (
			<div className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Building className="h-5 w-5" />
							Resumen de la Torre
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-muted-foreground mb-4 text-sm">
							Haz clic en un piso para ver información detallada
						</p>

						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm">Total de pisos:</span>
								<span className="font-semibold">{allFloors.length}</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm">Promedio equipos/piso:</span>
								<span className="font-semibold">
									{Math.round(
										allFloors.reduce(
											(sum, floor) => sum + floor.totalEquipment,
											0
										) / allFloors.length
									)}
								</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm">Mejor piso (% online):</span>
								<span className="font-semibold text-green-600">
									Piso{' '}
									{
										allFloors.reduce((best, floor) =>
											floor.onlineEquipment / floor.totalEquipment >
											best.onlineEquipment / best.totalEquipment
												? floor
												: best
										).floor
									}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Top 5 Pisos por Performance</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{allFloors
								.sort(
									(a, b) =>
										b.onlineEquipment / b.totalEquipment -
										a.onlineEquipment / a.totalEquipment
								)
								.slice(0, 5)
								.map((floor, index) => {
									const percentage = (
										(floor.onlineEquipment / floor.totalEquipment) *
										100
									).toFixed(1)
									return (
										<div
											key={floor.floor}
											className="flex items-center justify-between rounded bg-gray-50 p-2"
										>
											<span className="text-sm font-medium">
												#{index + 1} - Piso {floor.floor}
											</span>
											<span className="text-sm font-semibold text-green-600">
												{percentage}%
											</span>
										</div>
									)
								})}
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	const onlinePercentage = (
		(selectedFloor.onlineEquipment / selectedFloor.totalEquipment) *
		100
	).toFixed(1)
	const offlinePercentage = (
		(selectedFloor.offlineEquipment / selectedFloor.totalEquipment) *
		100
	).toFixed(1)

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Building className="h-5 w-5" />
						Piso {selectedFloor.floor}
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="rounded-lg bg-green-50 p-3 text-center">
							<Power className="mx-auto mb-1 h-6 w-6 text-green-600" />
							<div className="text-2xl font-bold text-green-600">
								{selectedFloor.onlineEquipment}
							</div>
							<div className="text-sm text-green-700">
								Online ({onlinePercentage}%)
							</div>
						</div>

						<div className="rounded-lg bg-red-50 p-3 text-center">
							<PowerOff className="mx-auto mb-1 h-6 w-6 text-red-600" />
							<div className="text-2xl font-bold text-red-600">
								{selectedFloor.offlineEquipment}
							</div>
							<div className="text-sm text-red-700">
								Offline ({offlinePercentage}%)
							</div>
						</div>
					</div>

					<div className="border-t pt-4">
						<div className="mb-2 flex items-center justify-between">
							<span className="text-sm font-medium">Total de Equipos:</span>
							<span className="text-lg font-bold">
								{selectedFloor.totalEquipment}
							</span>
						</div>

						<div className="flex items-center justify-between">
							<span className="text-sm font-medium">Departamentos:</span>
							<span className="text-sm">
								{Array.from(selectedFloor.departments).join(', ')}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<Users className="h-5 w-5" />
						Estado del Piso
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						<div className="h-3 w-full rounded-full bg-gray-200">
							<div
								className="h-3 rounded-full bg-green-500 transition-all duration-300"
								style={{ width: `${onlinePercentage}%` }}
							></div>
						</div>

						<div className="flex justify-between text-sm">
							<span className="text-green-600">Online: {onlinePercentage}%</span>
							<span className="text-red-600">Offline: {offlinePercentage}%</span>
						</div>

						<div className="mt-4 rounded-lg bg-blue-50 p-3">
							<div className="text-sm">
								<strong>Estado General:</strong>
								<span
									className={`ml-2 ${parseFloat(onlinePercentage) >= 85 ? 'text-green-600' : parseFloat(onlinePercentage) >= 70 ? 'text-yellow-600' : 'text-red-600'}`}
								>
									{parseFloat(onlinePercentage) >= 85
										? 'Excelente'
										: parseFloat(onlinePercentage) >= 70
											? 'Bueno'
											: 'Requiere Atención'}
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
