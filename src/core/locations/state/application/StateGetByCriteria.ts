import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type StateId } from '../domain/value-object/StateId'
import { type StateName } from '../domain/value-object/StateName'
import { type StateGetAllRepository } from '../domain/repository/StateGetAllRepository'
import { type RegionId } from '../../region/domain/value-object/RegionId'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { StateGetAll } from './StateGetAll'

export interface StateFilters {
	options: {
		id?: Primitives<StateId>
		name?: Primitives<StateName>
		regionId?: Primitives<RegionId>
	}
	pageNumber?: number
	pageSize?: number
}

export class StateGetByCriteria {
	private readonly getAll: StateGetAll
	constructor(private readonly repository: StateGetAllRepository) {
		this.getAll = new StateGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: StateFilters) {
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
		if (options.regionId) {
			query.filters.push({
				field: 'regionId',
				operator: Operator.EQUAL,
				value: options.regionId
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
