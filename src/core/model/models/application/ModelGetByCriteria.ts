import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type ModelId } from '../domain/value-object/ModelId'
import { type ModelName } from '../domain/value-object/ModelName'
import { type BrandId } from '@/core/brand/domain/value-object/BrandId'
import { type ModelGetAllRepository } from '../domain/repository/ModelGetAllRepository'
import { type CategoryId } from '@/core/category/domain/value-object/CategorydId'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { ModelGetAll } from './ModelGetAll'

export interface ModelFilters {
	options: {
		id?: Primitives<ModelId>
		name?: Primitives<ModelName>
		categoryId?: Primitives<CategoryId>
		brandId?: Primitives<BrandId>
	}
	pageNumber?: number
	pageSize?: number
}

export class ModelGetByCriteria {
	private readonly getAll: ModelGetAll
	constructor(private readonly repository: ModelGetAllRepository) {
		this.getAll = new ModelGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: ModelFilters) {
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
		if (options.categoryId) {
			query.filters.push({
				field: 'categoryId',
				operator: Operator.EQUAL,
				value: options.categoryId
			})
		}
		if (options.brandId) {
			query.filters.push({
				field: 'brandId',
				operator: Operator.EQUAL,
				value: options.brandId
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
