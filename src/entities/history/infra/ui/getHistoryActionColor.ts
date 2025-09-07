import { historyActionConfig } from './historyActionConfig'
import { type HistoryActionTypes } from '../../domain/value-object/HistoryAction'
import { type BackgroundType } from '@/shared/ui/Typography/types'

export const getHistoryActionColor = (action: HistoryActionTypes): BackgroundType => {
	return historyActionConfig[action]?.color ?? 'gris'
}
