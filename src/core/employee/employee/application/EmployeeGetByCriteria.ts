import { Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { EmployeeGetAllRepository } from '../domain/repository/EmployeeGetAllRepository'
import { EmployeeGetAll } from './EmployeeGetAll'
import { EmployeeType } from '../domain/value-object/EmployeeType'
import { EmployeeId } from '../domain/value-object/EmployeeId'
import { EmployeeUserName } from '../domain/value-object/EmployeUsername'
import { EmployeeName } from '../domain/value-object/EmployeeName'
import { EmployeeEmail } from '../domain/value-object/EmployeeEmail'
import { EmployeeLastName } from '../domain/value-object/EmployeeLastName'
import { EmployeeIsStillWorking } from '../domain/value-object/EmployeeIsStillWorking'
import { CargoId } from '../../cargo/domain/value-object/CargoId'
import { DepartamentoId } from '../../departamento/domain/value-object/DepartamentoId'
import { LocationId } from '@/core/locations/locations/domain/value-object/LocationId'
import { CentroTrabajoId } from '../../centroTrabajo/domain/value-object/CentroTrabajoId'
import { EmployeeCedula } from '../domain/value-object/EmployeeCedula'
import { EmployeeNationality } from '../domain/value-object/EmployeeNationality'
import { EmployeeCode } from '../domain/value-object/EmployeeCode'
import { Criteria } from '@/core/shared/domain/criteria/Criteria'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'
import { Operator } from '@/core/shared/domain/criteria/FilterOperators'
import { SearchByCriteriaQuery } from '@/core/shared/domain/criteria/SearchByCriteriaQuery'

export interface EmployeeFilters {
	options: {
		id?: Primitives<EmployeeId>
		userName?: Primitives<EmployeeUserName>
		type?: Primitives<EmployeeType>
		name?: Primitives<EmployeeName>
		lastName?: Primitives<EmployeeLastName>
		email?: Primitives<EmployeeEmail>
		isStillWorking?: Primitives<EmployeeIsStillWorking>
		employeeCode?: Primitives<EmployeeCode>
		nationality?: Primitives<EmployeeNationality>
		cedula?: Primitives<EmployeeCedula>
		centroTrabajoId?: Primitives<CentroTrabajoId>
		locationId?: Primitives<LocationId>
		departamentoId?: Primitives<DepartamentoId>
		cargoId?: Primitives<CargoId>
	}
	pageNumber?: number
	pageSize?: number
}

export class EmployeeGetByCriteria {
	private readonly getAll: EmployeeGetAll
	constructor(private readonly repository: EmployeeGetAllRepository) {
		this.getAll = new EmployeeGetAll(this.repository)
	}

	async search({ options, pageNumber, pageSize }: EmployeeFilters) {
		const query: SearchByCriteriaQuery = {
			filters: [],
			pageSize: 10,
			orderBy: 'userName',
			orderType: OrderTypes.ASC
		}
		if (options.id) {
			query.filters.push({
				field: 'id',
				operator: Operator.EQUAL,
				value: options.id
			})
		}
		if (options.userName) {
			query.filters.push({
				field: 'userName',
				operator: Operator.CONTAINS,
				value: options.userName
			})
		}
		if (options.type) {
			query.filters.push({
				field: 'type',
				operator: Operator.EQUAL,
				value: options.type
			})
		}
		if (options.name) {
			query.filters.push({
				field: 'name',
				operator: Operator.CONTAINS,
				value: options.name
			})
		}
		if (options.lastName) {
			query.filters.push({
				field: 'lastName',
				operator: Operator.CONTAINS,
				value: options.lastName
			})
		}
		if (options.email) {
			query.filters.push({
				field: 'email',
				operator: Operator.CONTAINS,
				value: options.email
			})
		}
		if (options.isStillWorking) {
			query.filters.push({
				field: 'isStillWorking',
				operator: Operator.EQUAL,
				value: options.isStillWorking
			})
		}
		if (options.employeeCode) {
			query.filters.push({
				field: 'employeeCode',
				operator: Operator.CONTAINS,
				value: options.employeeCode
			})
		}
		if (options.nationality) {
			query.filters.push({
				field: 'nationality',
				operator: Operator.EQUAL,
				value: options.nationality
			})
		}
		if (options.cedula) {
			query.filters.push({
				field: 'cedula',
				operator: Operator.CONTAINS,
				value: options.cedula
			})
		}
		if (options.centroTrabajoId) {
			query.filters.push({
				field: 'centroTrabajoId',
				operator: Operator.EQUAL,
				value: options.centroTrabajoId
			})
		}
		if (options.locationId) {
			query.filters.push({
				field: 'locationId',
				operator: Operator.EQUAL,
				value: options.locationId
			})
		}
		if (options.departamentoId) {
			query.filters.push({
				field: 'departamentoId',
				operator: Operator.EQUAL,
				value: options.departamentoId
			})
		}
		if (options.cargoId) {
			query.filters.push({
				field: 'cargoId',
				operator: Operator.EQUAL,
				value: options.cargoId
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
