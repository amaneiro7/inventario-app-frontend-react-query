import { BadgeProps } from '@/shared/ui/Badge'
import { HistoryActionTypes } from '../../domain/value-object/HistoryAction'
import { type BackgroundType } from '@/shared/ui/Typography/types'
import { type IconName } from '@/shared/ui/icon/Icon'

type historyActionConfig = Record<
	HistoryActionTypes,
	{
		text: string
		icon: IconName
		className: HTMLElement['className']
		color: BackgroundType
		title: string
		variant: BadgeProps['variant']
	}
>

export const historyActionConfig: historyActionConfig = {
	[HistoryActionTypes.CREATE]: {
		text: 'Creación',
		icon: 'plusCircle',
		className: 'bg-verde-100 text-verde-800',
		color: 'verde',
		title: 'Equipo Creado',
		variant: 'verde'
	},
	[HistoryActionTypes.UPDATE]: {
		text: 'Modificación',
		icon: 'clock',
		className: 'bg-azul-100 text-azul-800',
		color: 'azul',
		title: 'Equipo Actualizado',
		variant: 'azul'
	},
	[HistoryActionTypes.ASSIGN]: {
		text: 'Asignado',
		icon: 'checkCircle2',
		className: 'bg-verde-100 text-verde-800',
		color: 'verde',
		title: 'Equipo Asignado',
		variant: 'verde'
	},
	[HistoryActionTypes.UNASSIGN]: {
		text: 'Desasignado',
		icon: 'logOut',
		className: 'bg-naranja-100 text-naranja-800',
		color: 'naranja',
		title: 'Equipo Desasignado',
		variant: 'naranja'
	},
	[HistoryActionTypes.DELETE]: {
		text: 'Eliminado',
		icon: 'trash',
		className: 'bg-rojo-100 text-rojo-800',
		color: 'rojo',
		title: 'Equipo Eliminado',
		variant: 'rojo'
	}
}
