import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type RoleId } from '../domain/value-object/RoleId'
import { type RoleName } from '../domain/value-object/RoleName'
import { type RoleGetAllRepository } from '../domain/repository/RoleGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { RoleGetAll } from './RoleGetAll'

export interface RoleFilters {
	options: {
		id?: Primitives<RoleId>
		name?: Primitives<RoleName>
	}
	pageNumber?: number
	pageSize?: number
}

export class RoleGetByCriteria {
	private readonly getAll: RoleGetAll
	constructor(private readonly repository: RoleGetAllRepository) {
		this.getAll = new RoleGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: RoleFilters) {
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
