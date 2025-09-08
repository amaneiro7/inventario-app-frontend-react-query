import { DeviceMonitoringStatuses } from '@/entities/devices/deviceMonitoring/domain/value-object/Status'
import { BadgeProps } from '@/shared/ui/Badge'
import { type IconName } from '@/shared/ui/icon/Icon'
import { type BackgroundType, type ColorType } from '@/shared/ui/Typography/types'

type MonitoringStatusConfig = Record<
	DeviceMonitoringStatuses,
	{
		name: string
		className: string
		icon: IconName
		color: ColorType
		backGroundColor: BackgroundType
		badgeVariant: BadgeProps['variant']
	}
>
export const monitoringStatusConfig: MonitoringStatusConfig = {
	[DeviceMonitoringStatuses.ONLINE]: {
		name: 'En línea',
		className: 'ml-4 h-4 w-4 text-center text-verde-500',
		icon: 'wifi',
		color: 'white',
		backGroundColor: 'verde',
		badgeVariant: 'verde'
	},
	[DeviceMonitoringStatuses.OFFLINE]: {
		name: 'Fuera de línea',
		className: 'ml-4 h-4 w-4 text-rojo-500',
		icon: 'wifiOff',
		color: 'white',
		backGroundColor: 'rojo',
		badgeVariant: 'rojo'
	},
	[DeviceMonitoringStatuses.HOSTNAME_MISMATCH]: {
		name: 'Conflicto de Host',
		className: 'ml-4 h-4 w-4 text-naranja-500',
		icon: 'triangleAlert',
		color: 'white',
		backGroundColor: 'naranja',
		badgeVariant: 'naranja'
	},
	[DeviceMonitoringStatuses.NOTAVAILABLE]: {
		name: 'No Disponible',
		className: 'ml-4 h-4 w-4 text-gris-500',
		icon: 'circleSlash',
		color: 'white',
		backGroundColor: 'gris',
		badgeVariant: 'default'
	}
}
