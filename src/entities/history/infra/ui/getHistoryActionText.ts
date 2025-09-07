import { historyActionConfig } from './historyActionConfig'
import { type HistoryActionTypes } from '../../domain/value-object/HistoryAction'

export const getHistoryActionText = (action: HistoryActionTypes): string => {
	return historyActionConfig[action]?.text ?? 'N/A'
}
