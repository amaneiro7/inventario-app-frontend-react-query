import { ModelGetByCriteria } from '@/core/model/models/application/ModelGetByCriteria'
import { useGenericFilter } from '../../../../../hooks/useHookFilter'
import { type ModelFilters } from '@/core/model/models/application/CreateModelsQueryParams'
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
