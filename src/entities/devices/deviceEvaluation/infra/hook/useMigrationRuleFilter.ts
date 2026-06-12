import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import type { MigrationRuleFilters } from '../../application/createMigrationRuleQueryParams'
import { MigrationRuleGetByCriteria } from '../../application/MigrationRuleGetByCriteria'

/**
 * A React hook for managing MigrationRule filters.
 * It leverages `useGenericFilter` to provide filtering capabilities based on `MigrationRuleFilters`.
 * @returns An object containing filter state and handlers for updating filters.
 */
export function useMigrationRuleFilter() {
	return useGenericFilter<MigrationRuleFilters>({
		defaultPageSize: MigrationRuleGetByCriteria.defaultPageSize,
		filterKeys: [
			'minDiskGb',
			'minRamGb',
			'processorId',
			'isActive',
			'minRamGbOperator',
			'minDiskGbOperator',
			'orderBy',
			'orderType'
		]
	})
}
