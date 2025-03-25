import { useGenericFilter } from '@/hooks/useHookFilter'
import { type HistoryFilters } from '../../application/createHistoryQueryParams'
import { HistoryGetByCriteria } from '../../application/HistoryGetByCriteria'

export function useHistoryFilter() {
	return useGenericFilter<HistoryFilters>({
		defaultPageSize: HistoryGetByCriteria.defaultPageSize,
		filterKeys: ['action', 'deviceId', 'employeeId', 'userId', 'orderBy', 'orderType']
	})
}
