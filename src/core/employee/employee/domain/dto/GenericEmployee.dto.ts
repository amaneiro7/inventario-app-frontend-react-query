import { EmployeeTypes } from '../value-object/EmployeeType'
import { type EmployeeParams } from './Employee.dto'

export interface GenericEmployeeParams extends EmployeeParams {
	type: EmployeeTypes.GENERIC
	name: null
	lastName: null
	email: null
	employeeCode: null
	nationality: null
	cedula: null
	centroTrabajoId: null
	locationId: null
	departamentoId: null
	cargoId: null
	extension: []
	phone: []
}
