import { shipmentStatusConfig } from './shipmentStatusConfig'
import { Icon, type IconName, type IconProps } from '@/shared/ui/icon/Icon'
import { type StatusEnum } from '../../domain/value-object/ShipmentStatus'

export const GetShipmentStatusIcon = ({
	status,
	...props
}: { status: StatusEnum } & Omit<IconProps, 'name'>) => {
	const iconName: IconName = shipmentStatusConfig[status]?.icon ?? 'helpCircle'
	return <Icon name={iconName} {...props} />
}
