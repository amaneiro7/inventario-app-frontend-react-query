import { useMemo } from 'react'
import Typography from '@/shared/ui/Typography'
import { Icon } from '@/shared/ui/icon/Icon'
import { TimelineItem, type DeviceAssignmentEvent } from './TimelineItem'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

interface DeviceHistoryProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	history?: DeviceDto['history'] // Idealmente usarías el tipo HistoryDto o similar aquí
	deviceData?: DeviceDto | undefined
}

export const DeviceHistoryTimeline = ({ history = [], deviceData }: DeviceHistoryProps) => {
	if (!history || history.length === 0) {
		return (
			<div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
				<Typography variant="p" className="text-gray-500">
					No hay historial de cambios para este dispositivo.
				</Typography>
			</div>
		)
	}

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
	}, [history])

	if (events.length === 0) {
		return (
			<div className="text-muted-foreground py-8 text-center">
				<Icon name="clock" className="mx-auto mb-2 h-12 w-12 opacity-50" />
				<Typography variant="p">No hay historial disponible</Typography>
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
