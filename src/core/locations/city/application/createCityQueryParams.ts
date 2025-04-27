import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/core/shared/domain/criteria/OrderBy'
import { OrderType } from '@/core/shared/domain/criteria/OrderType'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CityDto } from '../domain/dto/City.dto'

export interface CityFilters {
	id?: CityDto['id']
	name?: CityDto['name']
	stateId?: CityDto['stateId']
	regionId?: CityDto['state']['regionId']
	administrativeRegionId?: CityDto['state']['region']['administrativeRegionId']
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

export async function createCityParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	...options
}: CityFilters): Promise<string> {
	const query: SearchByCriteriaQuery = {
		filters: [],
		pageSize,
		pageNumber,
		orderBy,
		orderType
	}

	Object.entries(options).forEach(([key, value]) => {
		const index = query.filters.findIndex(filter => filter.field === key)

		if (!value) {
			if (index !== -1) {
				query.filters.splice(index, 1)
			}
		} else {
			if (index !== -1) {
				query.filters[index].value = value
			} else {
				query.filters.push({
					field: key,
					operator: key === 'name' ? Operator.CONTAINS : Operator.EQUAL,
					value
				})
			}
		}
	})

	const criteria = Criteria.fromValues(
		query.filters,
		query.orderBy,
		query.orderType,
		query.pageSize,
		query.pageNumber
	)
	const queryParams = criteria.buildQuery(criteria)

	return queryParams
}
