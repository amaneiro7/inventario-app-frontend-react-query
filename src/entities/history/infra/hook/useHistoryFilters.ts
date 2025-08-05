import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import { type HistoryFilters } from '../../application/createHistoryQueryParams'
import { HistoryGetByCriteria } from '../../application/HistoryGetByCriteria'

/**
 * A React hook for managing history filters.
 * It leverages `useGenericFilter` to provide filtering capabilities based on `HistoryFilters`.
 * @returns An object containing filter state and handlers for updating filters.
 */
export function useHistoryFilter() {
	return useGenericFilter<HistoryFilters>({
		defaultPageSize: HistoryGetByCriteria.defaultPageSize,
		filterKeys: [
			'action',
			'deviceId',
			'employeeId',
			'userId',
			'startDate',
			'endDate',
			'orderBy',
			'orderType'
		]
	})
}