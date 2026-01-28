import { Criteria } from '@/entities/shared/domain/criteria/Criteria'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/entities/shared/domain/criteria/OrderBy'
import { OrderType } from '@/entities/shared/domain/criteria/OrderType'
import { type SearchByCriteriaQuery } from '@/entities/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type MainCategoryDto } from '../domain/dto/MainCategory.dto'

/**
 * Defines the structure for filtering and pagination parameters when searching for main categories.
 */
export interface MainCategoryFilters {
	id?: MainCategoryDto['id']
	name?: MainCategoryDto['name']
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

/**
 * Creates a query string for searching main categories based on provided filters and pagination options.
 * It constructs a Criteria object and then builds a URL query string from it.
 *
 * @param filters - An object containing various filter criteria and pagination parameters.
 * @returns A Promise that resolves to the constructed query string.
 */
export async function createMainCategoryParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	...options
}: MainCategoryFilters): Promise<string> {
	const query: SearchByCriteriaQuery = {
		filters: [],
		pageSize,
		pageNumber,
		orderBy,
		orderType
	}

	Object.entries(options).forEach(([key, value]) => {
		const index = query.filters.findIndex(filter => filter.field === key)

		if (value === undefined || value === null || value === '') {
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
