import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { EmployeeType, EmployeeTypes } from '../value-object/EmployeeType'
import { Employee } from './Employee'
import { EmployeeUserName } from '../value-object/EmployeUsername'
import { EmployeeIsStillWorking } from '../value-object/EmployeeIsStillWorking'
import { GenericEmployeePrimitives } from '../dto/GenericEmployee.dto'

export class GenericEmployee extends Employee {
	constructor(
		username: EmployeeUserName,
		type: EmployeeType,
		name: null,
		lastName: null,
		email: null,
		isStillWorking: EmployeeIsStillWorking,
		employeeCode: null,
		nationality: null,
		cedula: null,
		centroTrabajoId: null,
		locationId: null,
		departamentoId: null,
		cargoId: null,
		extension: [],
		phone: []
	) {
		super(
			username,
			type,
			name,
			lastName,
			email,
			isStillWorking,
			employeeCode,
			nationality,
			cedula,
			centroTrabajoId,
			locationId,
			departamentoId,
			cargoId,
			extension,
			phone
		)
		this.ensureTypeIsGeneric()
	}
	private ensureTypeIsGeneric(): void {
		if (this.typeValue !== EmployeeTypes.GENERIC) {
			throw new InvalidArgumentError(
				'Un empleado genérico solo puede tener el tipo genérico'
			)
		}
	}

	static create(params: GenericEmployeePrimitives): GenericEmployee {
		return new GenericEmployee(
			new EmployeeUserName(params.userName),
			new EmployeeType(params.type),
			null,
			null,
			null,
			new EmployeeIsStillWorking(params.isStillWorking),
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			[],
			[]
		)
	}
}
