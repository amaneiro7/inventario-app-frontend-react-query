import { Criteria } from '@/entities/shared/domain/criteria/Criteria'
import { Operator } from '@/entities/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/entities/shared/domain/criteria/OrderBy'
import { OrderType } from '@/entities/shared/domain/criteria/OrderType'
import { type SearchByCriteriaQuery } from '@/entities/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Defines the structure for filtering and pagination parameters when searching for employees.
 */
export interface EmployeeFilters {
	id?: string
	userName?: string
	type?: string
	name?: string
	lastName?: string
	email?: string
	isStillWorking?: boolean
	employeeCode?: string
	nationality?: string
	cedula?: string
	locationId?: string
	departamentoId?: string
	vicepresidenciaId?: string
	vicepresidenciaEjecutivaId?: string
	directivaId?: string
	cargoId?: string
	regionId?: string
	stateId?: string
	cityId?: string
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

/**
 * Creates a query string for searching employees based on provided filters and pagination options.
 * It constructs a Criteria object and then builds a URL query string from it.
 *
 * @param filters - An object containing various filter criteria and pagination parameters.
 * @returns A Promise that resolves to the constructed query string.
 */
export async function createEmployeeParams({
	pageNumber,
	pageSize,
	orderBy,
	orderType,
	...options
}: EmployeeFilters): Promise<string> {
	const query: SearchByCriteriaQuery = {
		filters: [],
		pageSize,
		pageNumber,
		orderBy,
		orderType
	}

	const operatorMap: { [key: string]: Operator } = {
		userName: Operator.OR,
		name: Operator.OR,
		lastName: Operator.OR,
		email: Operator.CONTAINS
	}

	Object.entries(options).forEach(([key, value]) => {
		const index = query.filters.findIndex(filter => filter.field === key)

		if (value === undefined || value === null || value === '') {
			if (index !== -1) {
				query.filters.splice(index, 1)
			}
		} else {
			const operator = operatorMap[key] || Operator.EQUAL
			if (index !== -1) {
				query.filters[index].value = value
				query.filters[index].operator = operator
			} else {
				query.filters.push({
					field: key,
					operator,
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