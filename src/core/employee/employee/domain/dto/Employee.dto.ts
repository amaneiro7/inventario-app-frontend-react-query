import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeId } from '../value-object/EmployeeId'
import { type EmployeeUserName } from '../value-object/EmployeUsername'
import { type EmployeeTypes } from '../value-object/EmployeeType'
import { type EmployeeName } from '../value-object/EmployeeName'
import { type EmployeeLastName } from '../value-object/EmployeeLastName'
import { type Nullable } from '@/core/shared/domain/value-objects/Nullable'
import { type EmployeeEmail } from '../value-object/EmployeeEmail'
import { type EmployeeIsStillWorking } from '../value-object/EmployeeIsStillWorking'
import { type EmployeeCode } from '../value-object/EmployeeCode'
import { type EmployeeNationality } from '../value-object/EmployeeNationality'
import { type EmployeeCedula } from '../value-object/EmployeeCedula'
import { type CentroTrabajoId } from '@/core/employee/centroTrabajo/domain/value-object/CentroTrabajoId'
import { type DepartamentoId } from '@/core/employee/departamento/domain/value-object/DepartamentoId'
import { type LocationId } from '@/core/locations/locations/domain/value-object/LocationId'
import { type CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { type EmployeeExtension } from '../value-object/EmployeeExtension'
import { type EmployeePhoneNumber } from '../value-object/EmployeePhoneNumber'
import { type CentroTrabajoDto } from '@/core/employee/centroTrabajo/domain/dto/CentroTrabajo.dto'
import { type LocationDto } from '@/core/locations/locations/domain/dto/Location.dto'
import { type Cargo } from '@/core/employee/cargo/domain/dto/Cargo.dto'
import { type DepartamentoDto } from '@/core/employee/departamento/domain/dto/Departamento.dto'
import { type GenericEmployeeParams } from './GenericEmployee.dto'
import { type RegularEmployeeParams } from './RegularEmployee.dto'

export interface Employee {
	id: Primitives<EmployeeId>
	userName: Primitives<EmployeeUserName>
	type: EmployeeTypes
	name: Nullable<Primitives<EmployeeName>>
	lastName: Nullable<Primitives<EmployeeLastName>>
	email: Nullable<Primitives<EmployeeEmail>>
	isStillWorking: Primitives<EmployeeIsStillWorking>
	employeeCode: Nullable<Primitives<EmployeeCode>>
	nationality: Nullable<Primitives<EmployeeNationality>>
	cedula: Nullable<Primitives<EmployeeCedula>>
	centroTrabajoId: Nullable<Primitives<CentroTrabajoId>>
	locationId: Nullable<Primitives<LocationId>>
	departamentoId: Nullable<Primitives<DepartamentoId>>
	cargoId: Nullable<Primitives<CargoId>>
	extension: Primitives<EmployeeExtension>[]
	phone: Primitives<EmployeePhoneNumber>[]
}

export type EmployeePrimitives = Omit<Employee, 'id'>

export type EmployeeParams = EmployeePrimitives & {
	id?: Primitives<EmployeeId>
}

export type Params = RegularEmployeeParams | GenericEmployeeParams

export type EmployeeDto = Employee & {
	centoTrabajo: CentroTrabajoDto
	location: LocationDto
	departamento: DepartamentoDto
	cargo: Cargo
	updatedAt: string
}
