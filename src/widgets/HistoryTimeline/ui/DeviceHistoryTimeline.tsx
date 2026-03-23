import { DeviceHistoryTimelineOutput } from './DeviceHistoryTimelineOutput'
import Typography from '@/shared/ui/Typography'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'

interface DeviceHistoryProps {
	history?: DeviceDto['history']
	deviceData?: DeviceDto | undefined
}

const HISTORY_DEFAULT_ITEMS: DeviceDto['history'] = []
const DEVICE_DEFAULT_ITEMS: DeviceDto | undefined = undefined

export function DeviceHistoryTimeline({
	history = HISTORY_DEFAULT_ITEMS,
	deviceData = DEVICE_DEFAULT_ITEMS
}: DeviceHistoryProps) {
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
