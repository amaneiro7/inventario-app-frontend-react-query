import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeParams } from './Employee.dto'
import { type EmployeeTypes } from '../value-object/EmployeeType'
import { type EmployeeName } from '../value-object/EmployeeName'
import { type EmployeeLastName } from '../value-object/EmployeeLastName'
import { type EmployeeEmail } from '../value-object/EmployeeEmail'
import { type EmployeeIsStillWorking } from '../value-object/EmployeeIsStillWorking'
import { type EmployeeCode } from '../value-object/EmployeeCode'
import { type EmployeeNationality } from '../value-object/EmployeeNationality'
import { type EmployeeCedula } from '../value-object/EmployeeCedula'
import { type CentroTrabajoId } from '@/core/employee/centroTrabajo/domain/value-object/CentroTrabajoId'
import { type Nullable } from '@/core/shared/domain/value-objects/Nullable'
import { type LocationId } from '@/core/locations/locations/domain/value-object/LocationId'
import { type Departamento } from '@/core/employee/departamento/domain/entity/Departamento'
import { type CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { type EmployeeExtension } from '../value-object/EmployeeExtension'
import { type EmployeePhoneNumber } from '../value-object/EmployeePhoneNumber'
import { type EmployeeUserName } from '../value-object/EmployeUsername'

export interface RegularEmployeeParams extends EmployeeParams {
	username: Primitives<EmployeeUserName>
	type: EmployeeTypes.REGULAR | EmployeeTypes.SERVICE
	name: Primitives<EmployeeName>
	lastName: Primitives<EmployeeLastName>
	email: Primitives<EmployeeEmail>
	isStillWorking: Primitives<EmployeeIsStillWorking>
	employeeCode: Primitives<EmployeeCode>
	nationality: Primitives<EmployeeNationality>
	cedula: Primitives<EmployeeCedula>
	centroTrabajoId: Primitives<CentroTrabajoId>
	locationId: Nullable<Primitives<LocationId>>
	departamentoId: Primitives<Departamento>
	cargoId: Primitives<CargoId>
	extension: Primitives<EmployeeExtension>[]
	phone: Primitives<EmployeePhoneNumber>[]
}
