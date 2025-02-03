import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type LocationName } from '../domain/value-object/LocationName'
import { type TypeOfSiteId } from '../../typeOfSites/domain/value-object/TypeOfSiteId'
import { type SiteId } from '../../site/domain/value-object/SiteId'
import { type LocationId } from '../domain/value-object/LocationId'

import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { LocationGetAll } from './LocationGetAll'
import { LocationGetAllRepository } from '../domain/repository/LocationGetAllRepository'

export interface LocationFilters {
	options: {
		id?: Primitives<LocationId>
		name?: Primitives<LocationName>
		typeOfSiteId?: Primitives<TypeOfSiteId>
		siteId?: Primitives<SiteId>
	}
	pageNumber?: number
	pageSize?: number
}

export class LocationGetByCriteria {
	private readonly getAll: LocationGetAll
	constructor(private readonly repository: LocationGetAllRepository) {
		this.getAll = new LocationGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: LocationFilters) {
		const query: SearchByCriteriaQuery = {
			filters: [],
			orderBy: 'name',
			orderType: OrderTypes.ASC,
			pageNumber,
			pageSize
		}
		if (options.name) {
			query.filters.push({
				field: 'name',
				operator: Operator.CONTAINS,
				value: options.name
			})
		}
		if (options.typeOfSiteId) {
			query.filters.push({
				field: 'typeOfSiteId',
				operator: Operator.EQUAL,
				value: options.typeOfSiteId
			})
		}
		if (options.siteId) {
			query.filters.push({
				field: 'siteId',
				operator: Operator.EQUAL,
				value: options.siteId
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
