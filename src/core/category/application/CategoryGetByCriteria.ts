import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type MainCategoryId } from '@/core/mainCategory/domain/value-object/MainCategorydId'
import { type CategoryId } from '../domain/value-object/CategorydId'
import { type CategoryName } from '../domain/value-object/CategoryName'
import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { CategoryGetAll } from './CategoryGetAll'
import { CategoryGetAllRepository } from '../domain/repository/CategoryGetAllRepository'

export interface CategoryFilters {
	options: {
		id?: Primitives<CategoryId>
		name?: Primitives<CategoryName>
		mainCategoryId?: Primitives<MainCategoryId>
	}
	pageNumber?: number
	pageSize?: number
}

export class CategoryGetByCriteria {
	private readonly getAll: CategoryGetAll
	constructor(private readonly repository: CategoryGetAllRepository) {
		this.getAll = new CategoryGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: CategoryFilters) {
		const query: SearchByCriteriaQuery = {
			filters: [],
			orderBy: 'name',
			orderType: OrderTypes.ASC,
			pageNumber,
			pageSize
		}
		if (options.id) {
			query.filters.push({
				field: 'id',
				operator: Operator.EQUAL,
				value: options.id
			})
		}
		if (options.name) {
			query.filters.push({
				field: 'name',
				operator: Operator.CONTAINS,
				value: options.name
			})
		}
		if (options.mainCategoryId) {
			query.filters.push({
				field: 'mainCategoryId',
				operator: Operator.EQUAL,
				value: options.mainCategoryId
			})
		}

		const criteria = Criteria.fromValues(
			query.filters,
			query.orderBy,
			query.orderType,
			query.pageSize,
			query.pageNumber
		)

		const queryParams = criteria.buildQuery(criteria)

		return await this.getAll.execute(queryParams)
	}
}
