import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type OperatingSystemId } from '../domain/value-object/OperatingSystemId'
import { type OperatingSystemName } from '../domain/value-object/OperatingSystemName'
import { type OperatingSystemGetAllRepository } from '../domain/repository/OperatingSystemGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { OperatingSystemGetAll } from './OperatingSystemGetAll'

export interface OperatingSystemFilters {
	options: {
		id?: Primitives<OperatingSystemId>
		name?: Primitives<OperatingSystemName>
	}
	pageNumber?: number
	pageSize?: number
}

export class OperatingSystemGetByCriteria {
	private readonly getAll: OperatingSystemGetAll
	constructor(private readonly repository: OperatingSystemGetAllRepository) {
		this.getAll = new OperatingSystemGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: OperatingSystemFilters) {
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
