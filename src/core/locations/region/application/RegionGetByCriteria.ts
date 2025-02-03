import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type RegionId } from '../domain/value-object/RegionId'
import { type RegionName } from '../domain/value-object/RegionName'
import { type RegionGetAllRepository } from '../domain/repository/RegionGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { RegionGetAll } from './RegionGetAll'

export interface RegionFilters {
	options: {
		id?: Primitives<RegionId>
		name?: Primitives<RegionName>
	}
	pageNumber?: number
	pageSize?: number
}

export class RegionGetByCriteria {
	private readonly getAll: RegionGetAll
	constructor(private readonly repository: RegionGetAllRepository) {
		this.getAll = new RegionGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: RegionFilters) {
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
