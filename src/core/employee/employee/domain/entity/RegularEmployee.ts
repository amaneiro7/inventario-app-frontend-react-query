import { InvalidArgumentError } from '@/core/shared/domain/value-objects/InvalidArgumentError'
import { EmployeeType, EmployeeTypes } from '../value-object/EmployeeType'
import { Employee } from './Employee'
import { EmployeeUserName } from '../value-object/EmployeUsername'
import { EmployeeIsStillWorking } from '../value-object/EmployeeIsStillWorking'
import { EmployeePhoneNumber } from '../value-object/EmployeePhoneNumber'
import { EmployeeExtension } from '../value-object/EmployeeExtension'
import { CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { DepartamentoId } from '@/core/employee/departamento/domain/value-object/DepartamentoId'
import { LocationId } from '@/core/locations/locations/domain/value-object/LocationId'
import { CentroTrabajoId } from '@/core/employee/centroTrabajo/domain/value-object/CentroTrabajoId'
import { EmployeeCedula } from '../value-object/EmployeeCedula'
import { EmployeeNationality } from '../value-object/EmployeeNationality'
import { EmployeeCode } from '../value-object/EmployeeCode'
import { EmployeeEmail } from '../value-object/EmployeeEmail'
import { EmployeeLastName } from '../value-object/EmployeeLastName'
import { EmployeeName } from '../value-object/EmployeeName'
import { type RegularEmployeeParams } from '../dto/RegularEmployee.dto'
import { type Nullable } from '@/core/shared/domain/value-objects/Nullable'

export class RegularEmployee extends Employee {
	constructor(
		username: EmployeeUserName,
		type: EmployeeType,
		name: EmployeeName,
		lastName: EmployeeLastName,
		email: EmployeeEmail,
		isStillWorking: EmployeeIsStillWorking,
		employeeCode: EmployeeCode,
		nationality: EmployeeNationality,
		cedula: EmployeeCedula,
		centroTrabajoId: CentroTrabajoId,
		locationId: Nullable<LocationId>,
		departamentoId: DepartamentoId,
		cargoId: CargoId,
		extension: EmployeeExtension[],
		phone: EmployeePhoneNumber[]
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
		this.ensureTypeIsRegular()
	}
	private ensureTypeIsRegular(): void {
		if (this.typeValue !== EmployeeTypes.REGULAR) {
			throw new InvalidArgumentError('Un empleado regular solo puede tener el tipo REGULAR')
		}
	}

	static create(params: RegularEmployeeParams): RegularEmployee {
		return new RegularEmployee(
			new EmployeeUserName(params.userName),
			new EmployeeType(params.type),
			new EmployeeName(params.name, params.type),
			new EmployeeLastName(params.lastName, params.type),
			new EmployeeEmail(params.email, params.type),
			new EmployeeIsStillWorking(params.isStillWorking),
			new EmployeeCode(params.employeeCode, params.type),
			new EmployeeNationality(params.nationality),
			new EmployeeCedula(params.cedula, params.type),
			new CentroTrabajoId(params.centroTrabajoId),
			params?.locationId ? new LocationId(params.locationId) : null,
			new DepartamentoId(params.departamentoId),
			new CargoId(params.cargoId),
			params.extension?.filter(ext => ext).map(ext => new EmployeeExtension(ext)) ?? [],
			params.phone?.filter(phone => phone).map(phone => new EmployeePhoneNumber(phone)) ?? []
		)
	}
}
