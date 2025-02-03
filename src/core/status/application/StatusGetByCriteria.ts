import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type StatusId } from '../domain/value-object/StatusId'
import { type StatusName } from '../domain/value-object/StatusName'
import { type StatusGetAllRepository } from '../domain/repository/StatusGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { StatusGetAll } from './StatusGetAll'

export interface StatusFilters {
	options: {
		id?: Primitives<StatusId>
		name?: Primitives<StatusName>
	}
	pageNumber?: number
	pageSize?: number
}

export class StatusGetByCriteria {
	private readonly getAll: StatusGetAll
	constructor(private readonly repository: StatusGetAllRepository) {
		this.getAll = new StatusGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: StatusFilters) {
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
