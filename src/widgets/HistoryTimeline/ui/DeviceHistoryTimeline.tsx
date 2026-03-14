import { DeviceHistoryTimelineOutput } from './DeviceHistoryTimelineOutput'
import Typography from '@/shared/ui/Typography'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

interface DeviceHistoryProps {
	// eslint_disable-next-line @typescript-eslint/no-explicit-any
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
	return <DeviceHistoryTimelineOutput history={history} deviceData={deviceData} />
}
