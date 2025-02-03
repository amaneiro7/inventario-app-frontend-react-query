import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type ProcessorId } from '../domain/value-object/ProcessorId'
import { type ProcessorName } from '../domain/value-object/ProcessorName'
import { type ProcessorGetAllRepository } from '../domain/repository/ProcessorGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { ProcessorGetAll } from './ProcessorGetAll'

export interface ProcessorFilters {
	options: {
		id?: Primitives<ProcessorId>
		name?: Primitives<ProcessorName>
	}
	pageNumber?: number
	pageSize?: number
}

export class ProcessorGetByCriteria {
	private readonly getAll: ProcessorGetAll
	constructor(private readonly repository: ProcessorGetAllRepository) {
		this.getAll = new ProcessorGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: ProcessorFilters) {
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
