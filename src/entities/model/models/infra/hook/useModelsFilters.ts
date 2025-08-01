import { ModelGetByCriteria } from '@/entities/model/models/application/ModelGetByCriteria'
import { useGenericFilter } from '../../../../../shared/lib/hooks/useHookFilter'
import { type ModelFilters } from '@/entities/model/models/application/CreateModelsQueryParams'
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
