import { useMemo } from 'react'
import { HistoryActionTypes } from '@/entities/history/domain/value-object/HistoryAction'
import { type DeviceAssignmentEvent } from '../ui/TimelineItem'
import type { HistoryDto } from '@/entities/history/domain/dto/History.dto'
import type { DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

interface UseEmployeeHistoryProps {
	history: HistoryDto[]
	currentDevices: DeviceDto[]
}

export const useEmployeeHistoryTimeline = ({
	history = [],
	currentDevices = []
}: UseEmployeeHistoryProps) => {
	const events = useMemo<DeviceAssignmentEvent[]>(() => {
		//const currentDeviceIds = currentDevices.map(d => d.id)
		// eslint_disable-next-line @typescript-eslint/no-explicit-any
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

	return { events }
}
