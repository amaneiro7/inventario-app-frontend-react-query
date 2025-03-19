import { EmployeePhoneNumber } from '../value-object/EmployeePhoneNumber'
import { CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { DepartamentoId } from '@/core/employee/departamento/domain/value-object/DepartamentoId'
import { LocationId } from '@/core/locations/locations/domain/value-object/LocationId'
import { CentroTrabajoId } from '@/core/employee/centroTrabajo/domain/value-object/CentroTrabajoId'
import { EmployeeCedula } from '../value-object/EmployeeCedula'
import { EmployeeNationality } from '../value-object/EmployeeNationality'
import { EmployeeCode } from '../value-object/EmployeeCode'
import { EmployeeIsStillWorking } from '../value-object/EmployeeIsStillWorking'
import { EmployeeEmail } from '../value-object/EmployeeEmail'
import { EmployeeLastName } from '../value-object/EmployeeLastName'
import { EmployeeName } from '../value-object/EmployeeName'
import { EmployeeType } from '../value-object/EmployeeType'
import { EmployeeUserName } from '../value-object/EmployeUsername'
import { EmployeeExtension } from '../value-object/EmployeeExtension'
import { type Nullable } from '@/core/shared/domain/value-objects/Nullable'
import { type EmployeePrimitives } from '../dto/Employee.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class Employee {
	constructor(
		private readonly userName: EmployeeUserName,
		private readonly type: EmployeeType,
		private readonly name: Nullable<EmployeeName>,
		private readonly lastName: Nullable<EmployeeLastName>,
		private readonly email: Nullable<EmployeeEmail>,
		private readonly isStillWorking: EmployeeIsStillWorking,
		private readonly employeeCode: Nullable<EmployeeCode>,
		private readonly nationality: Nullable<EmployeeNationality>,
		private readonly cedula: Nullable<EmployeeCedula>,
		private readonly centroTrabajoId: Nullable<CentroTrabajoId>,
		private readonly locationId: Nullable<LocationId>,
		private readonly departamentoId: Nullable<DepartamentoId>,
		private readonly cargoId: Nullable<CargoId>,
		private readonly extension: EmployeeExtension[],
		private readonly phone: EmployeePhoneNumber[]
	) {}

	static assignValues(params: EmployeePrimitives) {
		return {
			userName: new EmployeeUserName(params.userName),
			type: new EmployeeType(params.type),
			name: params?.name ? new EmployeeName(params.name, params.type) : null,
			lastName: params?.lastName ? new EmployeeLastName(params.lastName, params.type) : null,
			email: params?.email ? new EmployeeEmail(params.email, params.type) : null,
			isStillWorking: new EmployeeIsStillWorking(params.isStillWorking),
			employeeCode: params?.employeeCode
				? new EmployeeCode(params.employeeCode, params.type)
				: null,
			nationality: params?.nationality ? new EmployeeNationality(params.nationality) : null,
			cedula: params?.cedula ? new EmployeeCedula(params.cedula, params.type) : null,
			CentroTrabajoId: params?.centroTrabajoId
				? new CentroTrabajoId(params.centroTrabajoId)
				: null,
			locationId: params?.locationId ? new LocationId(params.locationId) : null,
			departamentoId: params?.departamentoId
				? new DepartamentoId(params.departamentoId)
				: null,
			cargoId: params?.cargoId ? new CargoId(params.cargoId) : null,
			extension: params?.extension
				? params.extension.filter(ext => ext).map(ext => new EmployeeExtension(ext))
				: [],
			phone: params?.phone
				? params.phone.filter(phone => phone).map(phone => new EmployeePhoneNumber(phone))
				: []
		}
	}

	static create(params: EmployeePrimitives): Employee {
		const values = this.assignValues(params)
		return new Employee(
			values.userName,
			values.type,
			values.name,
			values.lastName,
			values.email,
			values.isStillWorking,
			values.employeeCode,
			values.nationality,
			values.cedula,
			values.CentroTrabajoId,
			values.locationId,
			values.departamentoId,
			values.cargoId,
			values.extension,
			values.phone
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
			centroTrabajoId: this.centroTrabajoValue,
			locationId: this.locationValue,
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

	get nameValue(): Nullable<Primitives<EmployeeName>> {
		return this.name?.value ?? null
	}
	get lastNameValue(): Nullable<Primitives<EmployeeLastName>> {
		return this.lastName?.value ?? null
	}
	get emailValue(): Nullable<Primitives<EmployeeEmail>> {
		return this.email?.value ?? null
	}
	get isStillWorkingValue(): Primitives<EmployeeIsStillWorking> {
		return this.isStillWorking.value
	}
	get employeeCodeValue(): Nullable<Primitives<EmployeeCode>> {
		return this.employeeCode?.value ?? null
	}
	get nationalityValue(): Nullable<Primitives<EmployeeNationality>> {
		return this.nationality?.value ?? null
	}
	get cedulaValue(): Nullable<Primitives<EmployeeCedula>> {
		return this.cedula?.value ?? null
	}
	get centroTrabajoValue(): Nullable<Primitives<CentroTrabajoId>> {
		return this.centroTrabajoId?.value ?? null
	}
	get locationValue(): Nullable<Primitives<LocationId>> {
		return this.locationId?.value ?? null
	}
	get departamentoValue(): Nullable<Primitives<DepartamentoId>> {
		return this.departamentoId?.value ?? null
	}
	get cargoValue(): Nullable<Primitives<CargoId>> {
		return this.cargoId?.value ?? null
	}
	get extensionValue(): Primitives<EmployeeExtension>[] {
		return this.extension.map(extension => extension.value)
	}
	get phoneValue(): Primitives<EmployeePhoneNumber>[] {
		return this.phone.map(phone => phone.value)
	}
}
