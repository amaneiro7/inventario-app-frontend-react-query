import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type CityId } from '../domain/value-object/CityId'
import { type CityName } from '../domain/value-object/CityName'
import { type CityGetAllRepository } from '../domain/repository/CityGetAllRepository'
import { type StateId } from '../../state/domain/value-object/StateId'
import { type RegionId } from '../../region/domain/value-object/RegionId'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { CityGetAll } from './CityGetAll'

export interface CityFilters {
	options: {
		id?: Primitives<CityId>
		name?: Primitives<CityName>
		stateId?: Primitives<StateId>
		regionId?: Primitives<RegionId>
	}
	pageNumber?: number
	pageSize?: number
}

export class CityGetByCriteria {
	private readonly getAll: CityGetAll
	constructor(private readonly repository: CityGetAllRepository) {
		this.getAll = new CityGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: CityFilters) {
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
		if (options.stateId) {
			query.filters.push({
				field: 'stateId',
				operator: Operator.EQUAL,
				value: options.stateId
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
