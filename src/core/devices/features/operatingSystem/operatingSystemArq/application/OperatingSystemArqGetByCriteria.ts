import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type OperatingSystemArqId } from '../domain/value-object/OperatingSystemArqId'
import { type OperatingSystemArqName } from '../domain/value-object/OperatingSystemArqName'
import { type OperatingSystemArqGetAllRepository } from '../domain/repository/OperatingSystemArqGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { OperatingSystemArqGetAll } from './OperatingSystemArqGetAll'

export interface OperatingSystemArqFilters {
	options: {
		id?: Primitives<OperatingSystemArqId>
		name?: Primitives<OperatingSystemArqName>
	}
	pageNumber?: number
	pageSize?: number
}

export class OperatingSystemArqGetByCriteria {
	private readonly getAll: OperatingSystemArqGetAll
	constructor(private readonly repository: OperatingSystemArqGetAllRepository) {
		this.getAll = new OperatingSystemArqGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: OperatingSystemArqFilters) {
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
