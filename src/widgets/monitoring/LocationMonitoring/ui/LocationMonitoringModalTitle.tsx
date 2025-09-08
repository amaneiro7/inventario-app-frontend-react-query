import { monitoringStatusConfig } from '../../Shared/Model/monitoringStatusConfig'
import Typography from '@/shared/ui/Typography'
import { Icon } from '@/shared/ui/icon/Icon'
import { Tag } from '@/shared/ui/Tag'
import { LocationMonitoringStatuses } from '@/entities/locations/locationMonitoring/domain/value-object/LocationMonitoringStatus'

interface LocationMonitoringModalTitleProps {
	locationName: string
	status: LocationMonitoringStatuses
}

export const LocationMonitoringModalTitle = ({
	locationName,
	status
}: LocationMonitoringModalTitleProps) => {
	const { color, backGroundColor, name, icon } = monitoringStatusConfig[status]
	return (
		<div>
			<Typography variant="h3" className="flex items-center gap-2">
				<Icon name="mapPin" size={24} />
				{locationName}
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
