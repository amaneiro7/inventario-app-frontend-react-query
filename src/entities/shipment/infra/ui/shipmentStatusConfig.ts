import { StatusEnum } from '../../domain/value-object/ShipmentStatus'
import { type BackgroundType } from '@/shared/ui/Typography/types'
import { type IconName } from '@/shared/ui/icon/Icon'

type ShipmentStatusConfig = Record<
	StatusEnum,
	{
		text: string
		icon: IconName
		className: HTMLElement['className']
		color: BackgroundType
	}
>

export const shipmentStatusConfig: ShipmentStatusConfig = {
	[StatusEnum.PENDING]: {
		text: 'Pendiente',
		icon: 'clock',
		className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-200',
		color: 'amarillo'
	},
	[StatusEnum.IN_TRANSIT]: {
		text: 'En Tránsito',
		icon: 'truck',
		className: 'bg-azul-100 text-azul-800',
		color: 'azul'
	},
	[StatusEnum.DELIVERED]: {
		text: 'Entregado',
		icon: 'checkCircle2',
		className: 'bg-verde-100 text-verde-800',
		color: 'verde'
	},
	[StatusEnum.CANCELLED]: {
		text: 'Cancelado',
		icon: 'xCircle',
		className: 'bg-rojo-100 text-rojo-800',
		color: 'rojo'
	}
}
