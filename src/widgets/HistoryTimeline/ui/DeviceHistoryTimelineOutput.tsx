import { useDeviceHistoryTimeline } from '../model/useDeviceHistoryTimeline'
import { TimelineItem } from './TimelineItem'
import { Icon } from '@/shared/ui/icon/Icon'
import Typography from '@/shared/ui/Typography'
import type { DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'
import type { HistoryDto } from '@/entities/history/domain/dto/History.dto'

interface DeviceHistoryTimelineOutputProps {
	history: HistoryDto[]
	deviceData: DeviceDto | undefined
}

export const DeviceHistoryTimelineOutput = ({
	deviceData,
	history
}: DeviceHistoryTimelineOutputProps) => {
	const { events } = useDeviceHistoryTimeline({ history, deviceData })
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
			{events.map(entry => (
				<TimelineItem key={entry.deviceId} event={entry} />
			))}
		</div>
	)
}
