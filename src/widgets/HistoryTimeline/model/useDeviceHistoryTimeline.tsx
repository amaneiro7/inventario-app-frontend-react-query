import { useMemo } from 'react'
import { type DeviceAssignmentEvent } from '../ui/TimelineItem'
import type { HistoryDto } from '@/entities/history/domain/dto/History.dto'
import type { DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

interface UseDeviceHistoryTimeline {
	history: HistoryDto[]
	deviceData?: DeviceDto | undefined
}

export const useDeviceHistoryTimeline = ({ history, deviceData }: UseDeviceHistoryTimeline) => {
	const events = useMemo<DeviceAssignmentEvent[]>(() => {
		const allEvents: DeviceAssignmentEvent[] = []

		history.forEach(entry => {
			// Construir la información del dispositivo.
			// Aunque estemos en la vista del dispositivo, esto sirve para mostrar el estado (marca/modelo)
			// que tenía en ese momento histórico.
			const brand = deviceData?.brand?.name || entry?.device?.brand?.name || 'Unknown'
			const model = deviceData?.model?.name || entry?.device?.model?.name || 'Device'
			const serial = deviceData?.serial || entry?.device?.serial || ''
			const deviceInfo = `${brand} ${model} ${serial ? `(${serial})` : ''}`

			const categoryName =
				entry?.device?.category?.name || deviceData?.category?.name || 'Equipo'

			allEvents.push({
				type: entry.action,
				deviceId: entry.deviceId,
				categoryName: categoryName,
				deviceInfo: deviceInfo,
				date: entry.formattedDate || new Date(entry.createdAt).toLocaleDateString('es-ES'),
				timestamp: new Date(entry.createdAt),
				changeBy: entry.user?.employee?.userName || 'Sistema',
				details: entry.cambios // TimelineItem ya sabe cómo renderizar esto
			})
		})

		// Ordenar por fecha descendente (más reciente primero)
		return allEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
	}, [history, deviceData])

	return { events }
}
