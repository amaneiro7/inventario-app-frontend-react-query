import { useMemo } from 'react'
import { HistoryActionTypes } from '@/entities/history/domain/value-object/HistoryAction'
import Typography from '@/shared/ui/Typography'
import { Icon } from '@/shared/ui/icon/Icon'
import { TimelineItem, type DeviceAssignmentEvent } from './TimelineItem'
import { type EmployeeDto } from '../../entities/employee/employee/domain/dto/Employee.dto'

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
			const isIncoming =
				entry.action === HistoryActionTypes.CREATE ||
				entry.action === HistoryActionTypes.ASSIGN
			const dataToUse = isIncoming ? entry.newData : entry.oldData

			allEvents.push({
				type: entry.action,
				deviceId: entry.deviceId,
				categoryName: entry?.device?.category?.name,
				deviceInfo: getDeviceInfo(entry.deviceId, dataToUse),
				date: entry.formattedDate || new Date(entry.createdAt).toLocaleDateString('es-ES'),
				timestamp: new Date(entry.createdAt),
				changeBy: entry.user?.employee?.userName || 'Sistema',
				details: entry.cambios
			})
			processedDevices.add(entry.deviceId)
		})

		// For devices that don't have clear history, add create based on device createdAt
		currentDevices.forEach(device => {
			if (!processedDevices.has(device.id)) {
				allEvents.push({
					type: HistoryActionTypes.CREATE,
					deviceId: device.id,
					categoryName: device.category?.name,
					deviceInfo: `${device.brand.name} ${device.model.name} (${device.serial})`,
					date: new Date(device.createdAt).toLocaleDateString('es-ES'),
					timestamp: new Date(device.createdAt)
				})
			}
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
			{events.map((entry, index) => (
				<TimelineItem key={`${entry.deviceId}-${index}`} event={entry} />
			))}
		</div>
	)
}
