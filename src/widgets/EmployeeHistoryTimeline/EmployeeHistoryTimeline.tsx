import { useMemo } from 'react'
import Typography from '@/shared/ui/Typography'
import { EmployeeDto } from '../../entities/employee/employee/domain/dto/Employee.dto'
import { Card, CardContent } from '@/shared/ui/Card'

import { Badge } from '@/shared/ui/Badge'
import { getHistoryActionText } from '@/entities/history/infra/ui/getHistoryActionText'
import { HistoryActionTypes } from '@/entities/history/domain/value-object/HistoryAction'
import { Icon } from '@/shared/ui/icon/Icon'
import { getHistoryActionIcon } from '@/entities/history/infra/ui/GetHistoryActionIcon'
import { getHistoryActionClassName } from '@/entities/history/infra/ui/getHistoryActionClassName'
import { cn } from '@/shared/lib/utils'
import { getCategoryIcon } from '../RecentActivities'

interface DeviceAssignmentEvent {
	type: HistoryActionTypes
	deviceId: string
	deviceInfo: string
	categoryId: string
	date: string
	timestamp: Date
	details?: Record<string, { oldValue: any; newValue: any }>
}

interface EmployeeHistoryProps {
	history?: EmployeeDto['history']
	currentDevices?: EmployeeDto['devices']
}

export const EmployeeHistoryTimeline = ({
	history = [],
	currentDevices = []
}: EmployeeHistoryProps) => {
	if (history === null || (history && history.length === 0)) {
		return (
			<div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
				<Typography variant="p" className="text-gray-500">
					No hay historial de asiganciones para este usuario.
				</Typography>
			</div>
		)
	}

	const events = useMemo<DeviceAssignmentEvent[]>(() => {
		//const currentDeviceIds = currentDevices.map(d => d.id)
		const getDeviceInfo = (deviceId: string, data?: any): string => {
			const currentDevice = currentDevices.find(d => d.id === deviceId)
			if (currentDevice) {
				return `${currentDevice.brand.name} ${currentDevice.model.name} (${currentDevice.serial})`
			}

			// Try to use Provided data
			if (data) {
				const brand = data.brand?.name || 'Unknown'
				const model = data.model?.name || 'Device'
				const serial = data.serial || ''
				return `${brand} ${model} ${serial ? `(${serial})` : ''}`
			}
			// Try to find device info in history entries
			const historyEntry = history.find(h => h.deviceId === deviceId)
			if (historyEntry?.newData) {
				const brand = historyEntry?.device?.brand?.name || 'Unknown'
				const model = historyEntry?.device?.model?.name || 'Device'
				const serial = historyEntry?.device?.serial || ''
				return `${brand} ${model} ${serial ? `(${serial})` : ''}`
			}

			return 'Unknown Device'
		}

		const processedDevices = new Set<string>()
		const allEvents: DeviceAssignmentEvent[] = []

		// Process history entries
		history.forEach(entry => {
			if (entry.action === HistoryActionTypes.CREATE) {
				// New device created and assigned
				allEvents.push({
					type: HistoryActionTypes.CREATE,
					deviceId: entry.deviceId,
					categoryId: entry?.device?.categoryId,
					deviceInfo: getDeviceInfo(entry.deviceId, entry.newData),
					date:
						entry.formattedDate ||
						new Date(entry.createdAt).toLocaleDateString('es-ES'),
					timestamp: new Date(entry.createdAt)
				})
				processedDevices.add(entry.deviceId)
			} else if (entry.action === HistoryActionTypes.DELETE) {
				// Device was deleted
				allEvents.push({
					type: HistoryActionTypes.DELETE,
					deviceId: entry.deviceId,
					categoryId: entry?.device?.categoryId,
					deviceInfo: getDeviceInfo(entry.deviceId, entry.oldData),
					date:
						entry.formattedDate ||
						new Date(entry.createdAt).toLocaleDateString('es-ES'),
					timestamp: new Date(entry.createdAt)
				})
				processedDevices.add(entry.deviceId)
			} else if (entry.action === HistoryActionTypes.ASSIGN) {
				// Device was assigned to employee
				allEvents.push({
					type: HistoryActionTypes.ASSIGN,
					deviceId: entry.deviceId,
					categoryId: entry?.device?.categoryId,
					deviceInfo: getDeviceInfo(entry.deviceId, entry.newData),
					date:
						entry.formattedDate ||
						new Date(entry.createdAt).toLocaleDateString('es-ES'),
					timestamp: new Date(entry.createdAt)
				})
				processedDevices.add(entry.deviceId)
			} else if (entry.action === HistoryActionTypes.UNASSIGN) {
				// Device was unassigned to employee
				allEvents.push({
					type: HistoryActionTypes.UNASSIGN,
					deviceId: entry.deviceId,
					categoryId: entry?.device?.categoryId,
					deviceInfo: getDeviceInfo(entry.deviceId, entry.oldData),
					date:
						entry.formattedDate ||
						new Date(entry.createdAt).toLocaleDateString('es-ES'),
					timestamp: new Date(entry.createdAt),
					details: entry.cambios
				})
				processedDevices.add(entry.deviceId)
			} else if (entry.action === HistoryActionTypes.UPDATE) {
				//  Device specs were updated
				allEvents.push({
					type: HistoryActionTypes.UPDATE,
					deviceId: entry.deviceId,
					categoryId: entry?.device?.categoryId,
					deviceInfo: getDeviceInfo(entry.deviceId, entry.oldData),
					date:
						entry.formattedDate ||
						new Date(entry.createdAt).toLocaleDateString('es-ES'),
					timestamp: new Date(entry.createdAt),
					details: entry.cambios
				})
				processedDevices.add(entry.deviceId)
			}
			// For devices that don't have clear history, add create based on device createdAt
			currentDevices.forEach(device => {
				if (!processedDevices.has(device.id)) {
					allEvents.push({
						type: HistoryActionTypes.CREATE,
						deviceId: device.id,
						categoryId: device.categoryId,
						deviceInfo: `${device.brand.name} ${device.model.name} (${device.serial})`,
						date: new Date(device.createdAt).toLocaleDateString('es-ES'),
						timestamp: new Date(device.createdAt)
					})
				}
			})
		})
		// Sort by timestamp descending (most recent first)
		return allEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
	}, [history, currentDevices])

	if (events.length === 0) {
		return (
			<div className="text-muted-foreground py-8 text-center">
				<Icon name="clock" className="mx-auto mb-2 h-12 w-12 opacity-50" />
				<Typography variant="p">No hay historial de equipos</Typography>
			</div>
		)
	}

	return (
		<div className="before:bg-border relative space-y-6 pl-8 before:absolute before:top-2 before:left-2.75 before:h-[calc(100%-16px)] before:w-0.5">
			{events.map((entry, index) => {
				return (
					<Card key={`${entry.deviceId}-${index}`} className="relative">
						{/* Timeline dot */}
						<CardContent
							className={cn(
								'absolute -left-8 flex h-6 w-6 items-center justify-center rounded-full p-0',
								getHistoryActionClassName(entry.type)
							)}
						>
							{getHistoryActionIcon({ action: entry.type, className: 'h-3.5 w-3.5' })}
						</CardContent>
						{/* Content */}
						<CardContent className="bg-card rounded-lg border p-4 shadow-sm">
							<div className="flex items-start justify-between gap-4">
								<div className="space-y-2">
									<div className="flex items-center gap-2">
										<Typography variant="p" weight="medium">
											{entry.type === HistoryActionTypes.CREATE &&
												'Equipo Asignado'}
											{entry.type === HistoryActionTypes.ASSIGN &&
												'Equipo Asignado'}
											{entry.type === HistoryActionTypes.UNASSIGN &&
												'Equipo Desasignado'}
											{entry.type === HistoryActionTypes.UPDATE &&
												'Equipo Actualizado'}
											{entry.type === HistoryActionTypes.DELETE &&
												'Equipo Desasignado'}
										</Typography>
										<Badge
											variant={
												entry.type === HistoryActionTypes.CREATE
													? 'default'
													: entry.type === HistoryActionTypes.ASSIGN
														? 'default'
														: entry.type === HistoryActionTypes.UNASSIGN
															? 'secondary'
															: entry.type ===
																  HistoryActionTypes.UPDATE
																? 'secondary'
																: 'destructive'
											}
											className="text-xs"
										>
											{getHistoryActionText(entry.type)}
										</Badge>
									</div>
									<div className="flex items-center gap-2 text-sm">
										{getCategoryIcon(entry?.categoryId)}
										<Typography>{entry.deviceInfo}</Typography>
									</div>

									{/* Details of changes */}
									{entry.details && (
										<div className="mt-3 space-y-1 border-t pt-3 text-xs">
											{Object.entries(entry.details).map(([key, change]) => (
												<div key={key} className="text-muted-foreground">
													<span className="font-medium">{key}:</span>{' '}
													{String(change.oldValue)} →{' '}
													<span className="text-foreground font-medium">
														{String(change.newValue)}
													</span>
												</div>
											))}
										</div>
									)}

									<Typography variant="p" color="foreground" option="tiny">
										{entry.date}
									</Typography>
								</div>
							</div>
						</CardContent>
					</Card>
				)
			})}
		</div>
	)
}
