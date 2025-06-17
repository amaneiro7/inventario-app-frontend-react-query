import { useState } from 'react'
import { Server, Monitor, Printer, Camera, Router } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { TooltipProvider } from '@/components/Tooltip'

export interface Device {
	id: string
	name: string
	ip: string
	mac?: string
	status: 'active' | 'inactive'
	location: string
	lastSeen: string
	type?: string
	os?: string
	manufacturer?: string
	floor?: string
	room?: string
	rack?: string
	cpu?: string
	memory?: string
	storage?: string
	cpuUsage?: string
	uptime?: string
	services?: string
	alerts?: string
	events?: {
		description: string
		timestamp: string
	}[]
}

interface AdminTowerProps {
	devices: Device[]
}

interface FloorStats {
	floor: string
	total: number
	active: number
	inactive: number
	activePercentage: number
	devices: Device[]
}

export function AdminTower({ devices }: AdminTowerProps) {
	const [selectedFloor, setSelectedFloor] = useState<string | null>(null)

	// Filter devices for Torre Administrativa only
	const towerDevices = devices.filter(device => device.location === 'Torre Administrativa')

	// Group devices by floor
	const floorStats: Record<string, FloorStats> = {}

	// Define floors in order (bottom to top)
	const floors = ['Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5']

	floors.forEach(floor => {
		const floorDevices = towerDevices.filter(d => d.floor === floor)
		const active = floorDevices.filter(d => d.status === 'active').length
		const inactive = floorDevices.filter(d => d.status === 'inactive').length
		const total = floorDevices.length

		floorStats[floor] = {
			floor,
			total,
			active,
			inactive,
			activePercentage: total > 0 ? (active / total) * 100 : 0,
			devices: floorDevices
		}
	})

	const getFloorColor = (percentage: number, total: number) => {
		if (total === 0) return '#f1f5f9' // gray for no devices
		if (percentage >= 80) return '#22c55e' // green
		if (percentage >= 60) return '#eab308' // yellow
		if (percentage >= 40) return '#f97316' // orange
		return '#ef4444' // red
	}

	const getFloorOpacity = (percentage: number, total: number) => {
		if (total === 0) return 0.3
		return 0.7 + (percentage / 100) * 0.3 // 0.7 to 1.0 opacity based on percentage
	}

	const getDeviceIcon = (type: string) => {
		switch (type.toLowerCase()) {
			case 'servidor':
			case 'server':
				return <Server className="h-4 w-4" />
			case 'pc':
				return <Monitor className="h-4 w-4" />
			case 'impresora':
			case 'printer':
				return <Printer className="h-4 w-4" />
			case 'cámara ip':
			case 'camera':
				return <Camera className="h-4 w-4" />
			case 'router':
			case 'switch':
			case 'switch core':
			case 'firewall':
				return <Router className="h-4 w-4" />
			default:
				return <Server className="h-4 w-4" />
		}
	}

	const getFloorDescription = (floor: string) => {
		switch (floor) {
			case 'Piso 1':
				return 'Lobby y Recepción'
			case 'Piso 2':
				return 'Recursos Humanos'
			case 'Piso 3':
				return 'Contabilidad y Finanzas'
			case 'Piso 4':
				return 'Gerencia y Administración'
			case 'Piso 5':
				return 'Centro de Datos Principal'
			default:
				return ''
		}
	}

	return (
		<TooltipProvider>
			<Card>
				<CardHeader>
					<CardTitle>Torre Administrativa - Estado de Equipos por Piso</CardTitle>
					<CardDescription>
						Haz clic en cualquier piso para ver los detalles de los equipos
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
						{/* Tower Visualization */}
						<div className="lg:col-span-2">
							<div className="relative h-[600px] w-full overflow-hidden rounded-lg border bg-gradient-to-b from-sky-100 to-sky-50">
								{/* Tower Structure */}
								<div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
									{/* Base/Foundation */}
									<div className="mb-2 h-8 w-80 rounded-b-lg bg-gray-400"></div>

									{/* Tower Floors (from bottom to top) */}
									{floors.map((floor, index) => {
										const stats = floorStats[floor]
										const isSelected = selectedFloor === floor
										return (
											<div
												key={floor}
												className={`relative mb-1 h-20 w-72 cursor-pointer border-2 transition-all duration-300 ${isSelected ? 'z-10 scale-105 border-blue-500' : 'border-gray-300'} hover:scale-102 hover:border-blue-400`}
												style={{
													backgroundColor: getFloorColor(
														stats.activePercentage,
														stats.total
													),
													opacity: getFloorOpacity(
														stats.activePercentage,
														stats.total
													)
												}}
												onClick={() => setSelectedFloor(floor)}
											>
												{/* Floor Label */}
												<div className="absolute top-1 left-2 text-xs font-bold text-gray-800">
													{floor}
												</div>

												{/* Floor Description */}
												<div className="absolute top-4 left-2 text-xs text-gray-700">
													{getFloorDescription(floor)}
												</div>

												{/* Stats */}
												<div className="absolute top-1 right-2 text-xs font-bold text-gray-800">
													{stats.activePercentage.toFixed(0)}%
												</div>
												<div className="absolute top-4 right-2 text-xs text-gray-700">
													{stats.active}/{stats.total}
												</div>

												{/* Device Icons */}
												<div className="absolute right-2 bottom-2 left-2 flex flex-wrap gap-1">
													{stats.devices.slice(0, 8).map(device => (
														<div
															key={device.id}
															className={`rounded p-1 text-xs ${
																device.status === 'active'
																	? 'bg-green-100 text-green-700'
																	: 'bg-red-100 text-red-700'
															} `}
															title={`${device.name} - ${device.status}`}
														>
															{getDeviceIcon(device.type || '')}
														</div>
													))}
													{stats.devices.length > 8 && (
														<div className="rounded bg-gray-100 p-1 text-xs text-gray-600">
															+{stats.devices.length - 8}
														</div>
													)}
												</div>

												{/* Windows Effect */}
												<div className="pointer-events-none absolute inset-0">
													<div className="grid h-full grid-cols-8 gap-1 p-2">
														{Array.from({ length: 16 }).map((_, i) => (
															<div
																key={i}
																className="rounded-sm bg-blue-200 opacity-30"
																style={{
																	backgroundColor:
																		Math.random() > 0.7
																			? '#fbbf24'
																			: '#bfdbfe'
																}}
															></div>
														))}
													</div>
												</div>
											</div>
										)
									})}

									{/* Tower Top */}
									<div className="relative h-6 w-72 rounded-t-lg bg-gray-600">
										<div className="absolute top-1 left-1/2 h-4 w-8 -translate-x-1/2 transform rounded-sm bg-red-500"></div>
										<div className="absolute top-0 left-1/4 h-2 w-2 rounded-full bg-yellow-400"></div>
										<div className="absolute top-0 right-1/4 h-2 w-2 rounded-full bg-yellow-400"></div>
									</div>
								</div>

								{/* Legend */}
								<div className="absolute top-4 left-4 rounded-lg border bg-white p-3 shadow-md">
									<h4 className="mb-2 text-sm font-medium">Estado de Equipos</h4>
									<div className="space-y-1 text-xs">
										<div className="flex items-center gap-2">
											<div
												className="h-4 w-4 rounded"
												style={{ backgroundColor: '#22c55e' }}
											></div>
											<span>80-100% Activos</span>
										</div>
										<div className="flex items-center gap-2">
											<div
												className="h-4 w-4 rounded"
												style={{ backgroundColor: '#eab308' }}
											></div>
											<span>60-79% Activos</span>
										</div>
										<div className="flex items-center gap-2">
											<div
												className="h-4 w-4 rounded"
												style={{ backgroundColor: '#f97316' }}
											></div>
											<span>40-59% Activos</span>
										</div>
										<div className="flex items-center gap-2">
											<div
												className="h-4 w-4 rounded"
												style={{ backgroundColor: '#ef4444' }}
											></div>
											<span>0-39% Activos</span>
										</div>
									</div>
								</div>

								{/* Tower Info */}
								<div className="absolute top-4 right-4 rounded-lg border bg-white p-3 shadow-md">
									<h4 className="mb-1 text-sm font-medium">
										Torre Administrativa
									</h4>
									<div className="text-xs text-gray-600">
										<div>5 Pisos</div>
										<div>{towerDevices.length} Equipos Total</div>
										<div>
											{towerDevices.filter(d => d.status === 'active').length}{' '}
											Activos (
											{(
												(towerDevices.filter(d => d.status === 'active')
													.length /
													towerDevices.length) *
												100
											).toFixed(1)}
											%)
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Floor Details Panel */}
						<div className="space-y-4">
							<div className="text-sm font-medium">
								{selectedFloor
									? `Detalles del ${selectedFloor}`
									: 'Selecciona un piso'}
							</div>

							{selectedFloor && floorStats[selectedFloor] ? (
								<div className="space-y-3">
									<div className="rounded-lg border p-4">
										<div className="text-2xl font-bold">
											{floorStats[selectedFloor].activePercentage.toFixed(1)}%
										</div>
										<div className="text-muted-foreground text-sm">
											Equipos Activos
										</div>
										<div className="text-muted-foreground mt-1 text-xs">
											{getFloorDescription(selectedFloor)}
										</div>
									</div>

									<div className="grid grid-cols-2 gap-2">
										<div className="rounded-lg border p-3 text-center">
											<div className="text-lg font-semibold text-green-600">
												{floorStats[selectedFloor].active}
											</div>
											<div className="text-muted-foreground text-xs">
												Activos
											</div>
										</div>
										<div className="rounded-lg border p-3 text-center">
											<div className="text-lg font-semibold text-red-600">
												{floorStats[selectedFloor].inactive}
											</div>
											<div className="text-muted-foreground text-xs">
												Inactivos
											</div>
										</div>
									</div>

									<div className="rounded-lg border p-3 text-center">
										<div className="text-lg font-semibold">
											{floorStats[selectedFloor].total}
										</div>
										<div className="text-muted-foreground text-xs">
											Total Equipos
										</div>
									</div>

									{/* Progress bar */}
									<div className="space-y-2">
										<div className="flex justify-between text-sm">
											<span>Estado del Piso</span>
											<span>
												{floorStats[selectedFloor].activePercentage.toFixed(
													1
												)}
												%
											</span>
										</div>
										<div className="h-2 w-full rounded-full bg-gray-200">
											<div
												className="h-2 rounded-full transition-all duration-300"
												style={{
													width: `${floorStats[selectedFloor].activePercentage}%`,
													backgroundColor: getFloorColor(
														floorStats[selectedFloor].activePercentage,
														floorStats[selectedFloor].total
													)
												}}
											></div>
										</div>
									</div>

									{/* Device list for selected floor */}
									<div className="space-y-2">
										<div className="text-sm font-medium">
											Equipos en {selectedFloor}:
										</div>
										<div className="max-h-48 space-y-1 overflow-y-auto">
											{floorStats[selectedFloor].devices.map(device => (
												<div
													key={device.id}
													className="flex items-center justify-between rounded border p-2 text-xs"
												>
													<div className="flex items-center gap-2">
														{getDeviceIcon(device.type || '')}
														<div>
															<div className="truncate font-medium">
																{device.name}
															</div>
															<div className="text-gray-500">
																{device.room}
															</div>
														</div>
													</div>
													<div className="flex flex-col items-end gap-1">
														<Badge
															variant={
																device.status === 'active'
																	? 'default'
																	: 'destructive'
															}
															className="text-xs"
														>
															{device.status === 'active'
																? 'Activo'
																: 'Inactivo'}
														</Badge>
														<span className="text-xs text-gray-500">
															{device.ip}
														</span>
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							) : (
								<div className="text-muted-foreground p-8 text-center">
									<div className="mb-4">
										<Server className="mx-auto h-12 w-12 text-gray-400" />
									</div>
									<p className="text-sm">
										Haz clic en cualquier piso de la torre para ver los detalles
										de los equipos.
									</p>
									<div className="mt-4 space-y-1 text-xs">
										<div>
											🏢 <strong>Piso 1:</strong> Lobby y Recepción
										</div>
										<div>
											👥 <strong>Piso 2:</strong> Recursos Humanos
										</div>
										<div>
											💰 <strong>Piso 3:</strong> Contabilidad y Finanzas
										</div>
										<div>
											🏛️ <strong>Piso 4:</strong> Gerencia y Administración
										</div>
										<div>
											🖥️ <strong>Piso 5:</strong> Centro de Datos Principal
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</TooltipProvider>
	)
}
