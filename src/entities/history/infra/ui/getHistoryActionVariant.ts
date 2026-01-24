import { historyActionConfig } from './historyActionConfig'
import { type HistoryActionTypes } from '../../domain/value-object/HistoryAction'
import { type BadgeProps } from '@/shared/ui/Badge'

export const getHistoryActionVariant = (action: HistoryActionTypes): BadgeProps['variant'] => {
	return historyActionConfig[action]?.variant ?? 'default'
}
