import { historyActionConfig } from './historyActionConfig'
import { type HistoryActionTypes } from '../../domain/value-object/HistoryAction'

export const getHistoryActionClassName = (action: HistoryActionTypes): string => {
	return historyActionConfig[action]?.className ?? ''
}
