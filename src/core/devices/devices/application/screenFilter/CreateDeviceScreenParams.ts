import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/core/shared/domain/criteria/OrderBy'
import { OrderType } from '@/core/shared/domain/criteria/OrderType'
import { defaultQueries } from '../defaultQueries'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export interface DeviceScreenFilters {
	categoryId?: string
	brandId?: string
	statusId?: string
	activo?: string
	serial?: string
	modelId?: string
	employeeId?: string
	locationId?: string
	typeOfSiteId?: string
	vicepresidenciaEjecutivaId?: string
	vicepresidenciaId?: string
	directivaId?: string
	departamentoId?: string
	cargoId?: string
	cityId?: string
	stateId?: string
	regionId?: string
	administrativeRegionId?: string
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
	defaultQuery?: keyof typeof defaultQueries
}

export async function createDeviceQueryParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	defaultQuery,
	...options
}: DeviceScreenFilters): Promise<string> {
	const query: SearchByCriteriaQuery = {
		filters: defaultQuery ? defaultQueries[defaultQuery] : [],
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
					operator:
						key === 'serial' || key === 'activo' ? Operator.CONTAINS : Operator.EQUAL,
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
