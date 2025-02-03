import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type BrandId } from '../domain/value-object/BrandId'
import { type BrandName } from '../domain/value-object/BrandName'
import { type BrandGetAllRepository } from '../domain/repository/BrandGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { BrandGetAll } from './BrandGetAll'

export interface BrandFilters {
	options: {
		id?: Primitives<BrandId>
		name?: Primitives<BrandName>
	}
	pageNumber?: number
	pageSize?: number
}

export class BrandGetByCriteria {
	private readonly getAll: BrandGetAll
	constructor(private readonly repository: BrandGetAllRepository) {
		this.getAll = new BrandGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: BrandFilters) {
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
