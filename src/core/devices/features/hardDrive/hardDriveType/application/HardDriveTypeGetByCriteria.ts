import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type HardDriveTypeId } from '../domain/value-object/HardDriveTypeId'
import { type HardDriveTypeName } from '../domain/value-object/HardDriveTypeName'
import { type HardDriveTypeGetAllRepository } from '../domain/repository/HardDriveTypeGetAllRepository'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { HardDriveTypeGetAll } from './HardDriveTypeGetAll'

export interface HardDriveTypeFilters {
	options: {
		id?: Primitives<HardDriveTypeId>
		name?: Primitives<HardDriveTypeName>
	}
	pageNumber?: number
	pageSize?: number
}

export class HardDriveTypeGetByCriteria {
	private readonly getAll: HardDriveTypeGetAll
	constructor(private readonly repository: HardDriveTypeGetAllRepository) {
		this.getAll = new HardDriveTypeGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: HardDriveTypeFilters) {
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
