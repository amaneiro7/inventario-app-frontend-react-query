import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type InputTypeId } from '../domain/value-object/InputTypeId'
import { type InputTypeName } from '../domain/value-object/InputTypeName'
import { type InputTypeGetAllRepository } from '../domain/repository/InputTypeGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { InputTypeGetAll } from './InputTypeGetAll'

export interface InputTypeFilters {
	options: {
		id?: Primitives<InputTypeId>
		name?: Primitives<InputTypeName>
	}
	pageNumber?: number
	pageSize?: number
}

export class InputTypeGetByCriteria {
	private readonly getAll: InputTypeGetAll
	constructor(private readonly repository: InputTypeGetAllRepository) {
		this.getAll = new InputTypeGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: InputTypeFilters) {
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
