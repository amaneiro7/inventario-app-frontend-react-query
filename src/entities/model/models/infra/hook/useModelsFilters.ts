import { ModelGetByCriteria } from '@/entities/model/models/application/ModelGetByCriteria'
import { useGenericFilter } from '../../../../../shared/lib/hooks/useHookFilter'
import { type ModelFilters } from '@/entities/model/models/application/CreateModelsQueryParams'

/**
 * A React hook for managing model filters.
 * It leverages `useGenericFilter` to provide filtering capabilities based on `ModelFilters`.
 * @returns An object containing filter state and handlers for updating filters.
 */
export function useModelsFilter() {
	return useGenericFilter<ModelFilters>({
		defaultPageSize: ModelGetByCriteria.defaultPageSize,
		filterKeys: [
			'categoryId',
			'brandId',
			'mainCategoryId',
			'id',
			'name',
			'orderBy',
			'orderType'
		]
	})
}