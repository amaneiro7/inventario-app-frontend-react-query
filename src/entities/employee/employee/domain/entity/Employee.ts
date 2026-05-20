import { EmployeeUserName } from '../value-object/EmployeeUsername'
import { EmployeeType } from '../value-object/EmployeeType'
import { EmployeeName } from '../value-object/EmployeeName'
import { EmployeeLastName } from '../value-object/EmployeeLastName'
import { EmployeeEmail } from '../value-object/EmployeeEmail'
import { EmployeeIsStillWorking } from '../value-object/EmployeeIsStillWorking'
import { EmployeeCode } from '../value-object/EmployeeCode'
import { EmployeeNationality } from '../value-object/EmployeeNationality'
import { EmployeeCedula } from '../value-object/EmployeeCedula'
import { EmployeeLocation } from '../value-object/EmployeeLocation'
import { EmployeeCargo } from '../value-object/EmployeeCargo'
import { EmployeeExtension } from '../value-object/EmployeeExtension'
import { EmployeePhoneNumber } from '../value-object/EmployeePhoneNumber'
import { EmployeeUnidad } from '../value-object/EmployeeUnidad'
import type { EmployeePrimitives } from '../dto/Employee.dto'
import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export class Employee {
	constructor(
		private readonly userName: EmployeeUserName,
		private readonly type: EmployeeType,
		private readonly name: EmployeeName,
		private readonly lastName: EmployeeLastName,
		private readonly email: EmployeeEmail,
		private readonly isStillWorking: EmployeeIsStillWorking,
		private readonly employeeCode: EmployeeCode,
		private readonly nationality: EmployeeNationality,
		private readonly cedula: EmployeeCedula,
		private readonly locationId: EmployeeLocation,
		private readonly unidadId: EmployeeUnidad,
		private readonly cargoId: EmployeeCargo,
		private readonly extension: EmployeeExtension[],
		private readonly phone: EmployeePhoneNumber[]
	) {}

	public static create(params: EmployeePrimitives): Employee {
		return new Employee(
			new EmployeeUserName(params.userName),
			new EmployeeType(params.type),
			new EmployeeName(params.name, params.type),
			new EmployeeLastName(params.lastName, params.type),
			new EmployeeEmail(params.email),
			new EmployeeIsStillWorking(params.isStillWorking),
			new EmployeeCode(params.employeeCode, params.type),
			new EmployeeNationality(params.nationality, params.type),
			new EmployeeCedula(params.cedula, params.type),
			new EmployeeLocation(params.locationId),
			new EmployeeUnidad(params.unidadId, params.type),
			new EmployeeCargo(params.cargoId, params.type),
			EmployeeExtension.fromValues(params.extension),
			EmployeePhoneNumber.fromValues(params.phone)
		)
	}

	toPrimitives(): EmployeePrimitives {
		return {
			userName: this.userNameValue,
			type: this.typeValue,
			name: this.nameValue,
			lastName: this.lastNameValue,
			email: this.emailValue,
			isStillWorking: this.isStillWorkingValue,
			employeeCode: this.employeeCodeValue,
			nationality: this.nationalityValue,
			cedula: this.cedulaValue,
			locationId: this.locationValue,
			unidadId: this.unidadValue,
			cargoId: this.cargoValue,
			extension: this.extensionValue,
			phone: this.phoneValue
		}
	}

	get userNameValue(): Primitives<EmployeeUserName> {
		return this.userName.value
	}
	get typeValue(): Primitives<EmployeeType> {
		return this.type.value
	}

	get nameValue(): Primitives<EmployeeName> {
		return this.name.value
	}
	get lastNameValue(): Primitives<EmployeeLastName> {
		return this.lastName.value
	}
	get emailValue(): Primitives<EmployeeEmail> {
		return this.email.value
	}
	get isStillWorkingValue(): Primitives<EmployeeIsStillWorking> {
		return this.isStillWorking.value
	}
	get employeeCodeValue(): Primitives<EmployeeCode> {
		return this.employeeCode.value
	}
	get nationalityValue(): Primitives<EmployeeNationality> {
		return this.nationality.value
	}
	get cedulaValue(): Primitives<EmployeeCedula> {
		return this.cedula.value
	}

	get locationValue(): Primitives<EmployeeLocation> {
		return this.locationId.value
	}
	get unidadValue(): Primitives<EmployeeUnidad> {
		return this.unidadId.value
	}
	get cargoValue(): Primitives<EmployeeCargo> {
		return this.cargoId.value
	}
	get extensionValue(): Primitives<EmployeeExtension>[] {
		return this.extension.map(extension => extension.value)
	}
	get phoneValue(): Primitives<EmployeePhoneNumber>[] {
		return this.phone.map(phone => phone.value)
	}
}
