import { EmployeeUserName } from '../value-object/EmployeUsername'
import { EmployeeType } from '../value-object/EmployeeType'
import { EmployeeName } from '../value-object/EmployeeName'
import { EmployeeLastName } from '../value-object/EmployeeLastName'
import { EmployeeEmail } from '../value-object/EmployeeEmail'
import { EmployeeIsStillWorking } from '../value-object/EmployeeIsStillWorking'
import { EmployeeCode } from '../value-object/EmployeeCode'
import { EmployeeNationality } from '../value-object/EmployeeNationality'
import { EmployeeCedula } from '../value-object/EmployeeCedula'
import { EmployeeLocation } from '../value-object/EmployeeLocation'
import { EmployeeDirectiva } from '../value-object/EmployeeDirectiva'
import { EmployeeVicepresidenciaEjecutiva } from '../value-object/EmployeeVicepresidenciaEjecutiva'
import { EmployeeVicepresidencia } from '../value-object/EmployeeVicepresidencia'
import { EmployeeDepartamento } from '../value-object/EmployeeDepartamento'
import { EmployeeCargo } from '../value-object/EmployeeCargo'
import { EmployeeExtension } from '../value-object/EmployeeExtension'
import { EmployeePhoneNumber } from '../value-object/EmployeePhoneNumber'
import { type EmployeePrimitives } from '../dto/Employee.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

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
		private readonly directivaId: EmployeeDirectiva,
		private readonly vicepresidenciaEjecutivaId: EmployeeVicepresidenciaEjecutiva,
		private readonly vicepresidenciaId: EmployeeVicepresidencia,
		private readonly departamentoId: EmployeeDepartamento,
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
			new EmployeeDirectiva(params.directivaId, params.type),
			new EmployeeVicepresidenciaEjecutiva(
				params.vicepresidenciaEjecutivaId,
				params.directivaId
			),
			new EmployeeVicepresidencia(
				params.vicepresidenciaId,
				params.vicepresidenciaEjecutivaId
			),
			new EmployeeDepartamento(params.departamentoId, params.vicepresidenciaId),
			new EmployeeCargo(params.cargoId, params.type),
			params.extension?.map(ext => new EmployeeExtension(ext)),
			params.phone?.map(phone => new EmployeePhoneNumber(phone))
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
			directivaId: this.directivaValue,
			vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaValue,
			vicepresidenciaId: this.vicepresidenciaValue,
			departamentoId: this.departamentoValue,
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
	get directivaValue(): Primitives<EmployeeDirectiva> {
		return this.directivaId.value
	}
	get vicepresidenciaEjecutivaValue(): Primitives<EmployeeVicepresidenciaEjecutiva> {
		return this.vicepresidenciaEjecutivaId.value
	}
	get vicepresidenciaValue(): Primitives<EmployeeVicepresidencia> {
		return this.vicepresidenciaId.value
	}
	get departamentoValue(): Primitives<EmployeeDepartamento> {
		return this.departamentoId.value
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
