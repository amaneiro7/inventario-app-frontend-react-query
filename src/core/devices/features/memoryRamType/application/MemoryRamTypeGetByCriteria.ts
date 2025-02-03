import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type MemoryRamTypeId } from '../domain/value-object/MemoryRamTypeId'
import { type MemoryRamTypeName } from '../domain/value-object/MemoryRamTypeName'
import { type MemoryRamTypeGetAllRepository } from '../domain/repository/MemoryRamTypeGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { MemoryRamTypeGetAll } from './MemoryRamTypeGetAll'

export interface MemoryRamTypeFilters {
	options: {
		id?: Primitives<MemoryRamTypeId>
		name?: Primitives<MemoryRamTypeName>
	}
	pageNumber?: number
	pageSize?: number
}

export class MemoryRamTypeGetByCriteria {
	private readonly getAll: MemoryRamTypeGetAll
	constructor(private readonly repository: MemoryRamTypeGetAllRepository) {
		this.getAll = new MemoryRamTypeGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: MemoryRamTypeFilters) {
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
