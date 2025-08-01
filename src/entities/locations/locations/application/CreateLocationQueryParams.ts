import { Criteria } from '@/entities/shared/domain/criteria/Criteria'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/entities/shared/domain/criteria/OrderBy'
import { OrderType } from '@/entities/shared/domain/criteria/OrderType'
import { type SearchByCriteriaQuery } from '@/entities/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export interface LocationFilters {
	id?: string
	name?: string
	siteId?: string
	locationStatusId?: string
	typeOfSiteId?: string | string[]
	subnet?: string
	cityId?: string
	stateId?: string
	regionId?: string
	administrativeRegionId?: string
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

export async function createLocationParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	...options
}: LocationFilters): Promise<string> {
	const query: SearchByCriteriaQuery = {
		filters: [],
		pageSize,
		pageNumber,
		orderBy,
		orderType
	}

	Object.entries(options).forEach(([key, value]) => {
		const index = query.filters.findIndex(filter => filter.field === key)
		const indices = []
		for (const [i, filter] of query.filters.entries()) {
			if (filter.field === key) {
				indices.push(i)
			}
		}
		// Se chequea si value es undefined, null o un array vacio
		if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
			if (index !== -1) {
				query.filters.splice(index, 1)
			}
		} else if (Array.isArray(value)) {
			// Manejer value como array

			value.forEach(val => {
				query.filters.push({
					field: key,
					operator:
						key === 'name' || key === 'subnet'
							? Operator.CONTAINS
							: key === 'typeOfSiteId'
								? Operator.OR
								: Operator.EQUAL,
					value: val
				})
			})
		} else {
			// manejar el caso de single values
			if (index !== -1) {
				// Si existe, actualizar el valor
				query.filters[index].value = value
			} else {
				query.filters.push({
					field: key,
					operator:
						key === 'name' || key === 'subnet' ? Operator.CONTAINS : Operator.EQUAL,
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
