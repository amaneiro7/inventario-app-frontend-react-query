import { monitoringStatusConfig } from '../../Shared/Model/monitoringStatusConfig'
import Typography from '@/shared/ui/Typography'
import { Icon } from '@/shared/ui/icon/Icon'
import { Tag } from '@/shared/ui/Tag'
import { type DeviceMonitoringStatuses } from '@/entities/devices/deviceMonitoring/domain/value-object/Status'

interface DeviceMonitoringModalTitleProps {
	computerName: string
	status: DeviceMonitoringStatuses
}

export const DeviceMonitoringModalTitle = ({
	computerName,
	status
}: DeviceMonitoringModalTitleProps) => {
	const { color, backGroundColor, name, icon } = monitoringStatusConfig[status]
	return (
		<div>
			<Typography variant="h3" className="flex items-center gap-2">
				<Icon name="computer" size={24} />
				{computerName}
			</Typography>
			<div className="mt-2">
				<Tag
					backgroundColor={backGroundColor}
					color={color}
					option="tiny"
					iconText={name}
					icon={<Icon name={icon} className="h-4 w-4" />}
				/>
			</div>
		</div>
	)
}
