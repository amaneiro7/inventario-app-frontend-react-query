import { historyActionConfig } from './historyActionConfig'
import { type HistoryActionTypes } from '../../domain/value-object/HistoryAction'

export const getHistoryActionTitle = (action: HistoryActionTypes): string => {
	return historyActionConfig[action]?.title ?? 'N/A'
}
