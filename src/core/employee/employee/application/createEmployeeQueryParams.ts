import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { OrderBy } from '@/core/shared/domain/criteria/OrderBy'
import { OrderType } from '@/core/shared/domain/criteria/OrderType'
import { type SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeDto } from '../domain/dto/Employee.dto'

export interface EmployeeFilters {
	id?: EmployeeDto['id']
	userName?: EmployeeDto['userName']
	type?: EmployeeDto['type']
	name?: EmployeeDto['name']
	lastName?: EmployeeDto['lastName']
	email?: EmployeeDto['email']
	isStillWorking?: EmployeeDto['isStillWorking']
	employeeCode?: EmployeeDto['employeeCode']
	nationality?: EmployeeDto['nationality']
	cedula?: EmployeeDto['cedula']
	centroTrabajoId?: EmployeeDto['centroTrabajoId']
	locationId?: EmployeeDto['locationId']
	departamentoId?: EmployeeDto['departamentoId']
	vicepresidenciaEjecutivaId?: EmployeeDto['departamento']['vicepresidenciaEjecutivaId']
	directivaId?: EmployeeDto['departamento']['vicepresidenciaEjecutiva']['directivaId']
	cargoId?: EmployeeDto['cargoId']
	pageNumber?: number
	pageSize?: number
	orderBy?: Primitives<OrderBy>
	orderType?: Primitives<OrderType>
}

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
						key === 'userName' || key === 'name' || key === 'lastName'
							? Operator.OR
							: key === 'email' || key === 'employeeCode' || key === 'cedula'
							? Operator.CONTAINS
							: Operator.EQUAL,
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
