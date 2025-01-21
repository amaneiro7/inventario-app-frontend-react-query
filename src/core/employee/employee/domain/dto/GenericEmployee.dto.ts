import { EmployeeTypes } from '../value-object/EmployeeType'
import { EmployeePrimitives } from './Employee.dto'

export interface GenericEmployeePrimitives extends EmployeePrimitives {
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
