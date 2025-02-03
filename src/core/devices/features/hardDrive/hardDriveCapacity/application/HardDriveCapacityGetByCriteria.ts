import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type HardDriveCapacityId } from '../domain/value-object/HardDriveCapacityId'
import { type HardDriveCapacityName } from '../domain/value-object/HardDriveCapacityName'
import { type HardDriveCapacityGetAllRepository } from '../domain/repository/HardDriveCapacityGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { HardDriveCapacityGetAll } from './HardDriveCapacityGetAll'

export interface HardDriveCapacityFilters {
	options: {
		id?: Primitives<HardDriveCapacityId>
		name?: Primitives<HardDriveCapacityName>
	}
	pageNumber?: number
	pageSize?: number
}

export class HardDriveCapacityGetByCriteria {
	private readonly getAll: HardDriveCapacityGetAll
	constructor(private readonly repository: HardDriveCapacityGetAllRepository) {
		this.getAll = new HardDriveCapacityGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: HardDriveCapacityFilters) {
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
