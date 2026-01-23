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
	}
>

export const historyActionConfig: historyActionConfig = {
	[HistoryActionTypes.CREATE]: {
		text: 'Creación',
		icon: 'plusCircle',
		className: 'bg-amarillo-100 text-amarillo-800',
		color: 'verde'
	},
	[HistoryActionTypes.UPDATE]: {
		text: 'Modificación',
		icon: 'edit',
		className: 'bg-verde-100 text-verde-800',
		color: 'verde'
	},
	[HistoryActionTypes.ASSIGN]: {
		text: 'Asignado',
		icon: 'user',
		className: 'bg-azul-100 text-azul-800',
		color: 'azul'
	},
	[HistoryActionTypes.UNASSIGN]: {
		text: 'Desasignado',
		icon: 'userMinus',
		className: 'bg-gris-100 text-gris-800',
		color: 'gris'
	},
	[HistoryActionTypes.DELETE]: {
		text: 'Eliminado',
		icon: 'trash',
		className: 'bg-rojo-100 text-rojo-800',
		color: 'rojo'
	}
}
