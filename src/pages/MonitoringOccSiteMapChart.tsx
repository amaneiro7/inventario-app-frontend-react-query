import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Building, Power, PowerOff } from 'lucide-react'
import { FloorEquipmentStats } from '@/ui/monitoring/mcboSiteChart/FloorEquipmentStats'
import { inventoryData } from '@/ui/monitoring/mcboSiteChart/inventory'
import { TowerVisualization } from '@/ui/monitoring/mcboSiteChart/TowerVisualization'

const MonitoringOccSiteMapChart = () => {
	const navigate = useNavigate()
	const [selectedFloor, setSelectedFloor] = useState<number | null>(null)

	// Procesar datos para obtener estadísticas por piso
	const getFloorStats = () => {
		const floorMap = new Map()

		// Simular distribución de equipos por pisos basado en siteType
		inventoryData.forEach(item => {
			if (item.siteType === 'Torre' || item.siteType === 'Oficina') {
				// Distribuir equipos entre pisos 1-10 basado en el ID del item
				const floor = ((item.id - 1) % 10) + 1

				if (!floorMap.has(floor)) {
					floorMap.set(floor, {
						floor,
						totalEquipment: 0,
						onlineEquipment: 0,
						offlineEquipment: 0,
						departments: new Set()
					})
				}

				const floorData = floorMap.get(floor)
				const equipmentOnFloor = Math.ceil(item.quantity / 3) // Distribuir equipos
				floorData.totalEquipment += equipmentOnFloor

				// Simular departamentos por piso
				const departments = [
					'IT',
					'Contabilidad',
					'RRHH',
					'Gerencia',
					'Ventas',
					'Marketing'
				]
				floorData.departments.add(departments[floor % departments.length])

				// Simular equipos online/offline basado en stock status
				if (item.status === 'In Stock') {
					floorData.onlineEquipment += Math.floor(equipmentOnFloor * 0.9) // 90% online
					floorData.offlineEquipment +=
						equipmentOnFloor - Math.floor(equipmentOnFloor * 0.9)
				} else if (item.status === 'Low Stock') {
					floorData.onlineEquipment += Math.floor(equipmentOnFloor * 0.7) // 70% online
					floorData.offlineEquipment +=
						equipmentOnFloor - Math.floor(equipmentOnFloor * 0.7)
				} else {
					floorData.offlineEquipment += equipmentOnFloor
				}
			}
		})

		// Asegurar que tenemos al menos 10 pisos
		for (let i = 1; i <= 10; i++) {
			if (!floorMap.has(i)) {
				floorMap.set(i, {
					floor: i,
					totalEquipment: Math.floor(Math.random() * 20) + 5,
					onlineEquipment: 0,
					offlineEquipment: 0,
					departments: new Set(['Administración'])
				})
				const floorData = floorMap.get(i)
				floorData.onlineEquipment = Math.floor(floorData.totalEquipment * 0.85)
				floorData.offlineEquipment = floorData.totalEquipment - floorData.onlineEquipment
			}
		}

		return Array.from(floorMap.values()).sort((a, b) => b.floor - a.floor) // Ordenar de arriba hacia abajo
	}

	const floorStats = getFloorStats()
	const totalOnline = floorStats.reduce((sum, floor) => sum + floor.onlineEquipment, 0)
	const totalOffline = floorStats.reduce((sum, floor) => sum + floor.offlineEquipment, 0)
	const totalEquipment = totalOnline + totalOffline

	const handleFloorClick = (floorNumber: number) => {
		setSelectedFloor(floorNumber)
	}

	const selectedFloorData = selectedFloor
		? floorStats.find(floor => floor.floor === selectedFloor)
		: null

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto py-8">
				<div className="mb-6 flex items-center gap-4">
					<Button
						variant="outline"
						onClick={() => navigate('/')}
						className="flex items-center gap-2"
					>
						<ArrowLeft className="h-4 w-4" />
						Volver al Dashboard
					</Button>
					<h1 className="text-3xl font-bold">Torre Administrativa - Equipos por Piso</h1>
				</div>

				{/* Estadísticas generales */}
				<div className="mb-6 grid gap-4 md:grid-cols-3">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
								<Building className="h-4 w-4" />
								Total Equipos
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold">{totalEquipment}</div>
							<div className="text-muted-foreground text-sm">
								En {floorStats.length} pisos
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-sm font-medium text-green-600">
								<Power className="h-4 w-4" />
								Equipos Online
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-green-600">{totalOnline}</div>
							<div className="text-muted-foreground text-sm">
								{((totalOnline / totalEquipment) * 100).toFixed(1)}%
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="flex items-center gap-2 text-sm font-medium text-red-600">
								<PowerOff className="h-4 w-4" />
								Equipos Offline
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-red-600">{totalOffline}</div>
							<div className="text-muted-foreground text-sm">
								{((totalOffline / totalEquipment) * 100).toFixed(1)}%
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Visualización de la Torre */}
					<div className="lg:col-span-2">
						<Card>
							<CardHeader>
								<CardTitle>Torre Administrativa - Vista por Pisos</CardTitle>
							</CardHeader>
							<CardContent>
								<TowerVisualization
									floorStats={floorStats}
									selectedFloor={selectedFloor}
									onFloorClick={handleFloorClick}
								/>
							</CardContent>
						</Card>
					</div>

					{/* Panel de información */}
					<div className="lg:col-span-1">
						<FloorEquipmentStats
							selectedFloor={selectedFloorData}
							allFloors={floorStats}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MonitoringOccSiteMapChart
