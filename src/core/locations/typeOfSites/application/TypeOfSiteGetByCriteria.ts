import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type TypeOfSiteId } from '../domain/value-object/TypeOfSiteId'
import { type TypeOfSiteName } from '../domain/value-object/TypeOfSiteName'
import { type TypeOfSiteGetAllRepository } from '../domain/repository/TypeOfSiteGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { TypeOfSiteGetAll } from './TypeOfSiteGetAll'

export interface TypeOfSiteFilters {
	options: {
		id?: Primitives<TypeOfSiteId>
		name?: Primitives<TypeOfSiteName>
	}
	pageNumber?: number
	pageSize?: number
}

export class TypeOfSiteGetByCriteria {
	private readonly getAll: TypeOfSiteGetAll
	constructor(private readonly repository: TypeOfSiteGetAllRepository) {
		this.getAll = new TypeOfSiteGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: TypeOfSiteFilters) {
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
