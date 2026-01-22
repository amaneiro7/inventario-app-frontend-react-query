import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeId } from '../value-object/EmployeeId'
import { type EmployeeUserName } from '../value-object/EmployeeUsername'
import { type EmployeeTypes } from '../value-object/EmployeeType'
import { type EmployeeName } from '../value-object/EmployeeName'
import { type EmployeeLastName } from '../value-object/EmployeeLastName'
import { type EmployeeEmail } from '../value-object/EmployeeEmail'
import { type EmployeeIsStillWorking } from '../value-object/EmployeeIsStillWorking'
import { type EmployeeCode } from '../value-object/EmployeeCode'
import { type EmployeeNationality } from '../value-object/EmployeeNationality'
import { type EmployeeCedula } from '../value-object/EmployeeCedula'
import { type EmployeeExtension } from '../value-object/EmployeeExtension'
import { type EmployeePhoneNumber } from '../value-object/EmployeePhoneNumber'
import { type LocationDto } from '@/entities/locations/locations/domain/dto/Location.dto'
import { type Cargo } from '@/entities/employee/cargo/domain/dto/Cargo.dto'
import { type DepartamentoDto } from '@/entities/employee/departamento/domain/dto/Departamento.dto'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'
import { type VicepresidenciaEjecutivaDto } from '@/entities/employee/vicepresidenciaEjecutiva/domain/dto/VicepresidenciaEjecutiva.dto'
import { type VicepresidenciaDto } from '@/entities/employee/vicepresidencia/domain/dto/Vicepresidencia.dto'
import { type EmployeeDirectiva } from '../value-object/EmployeeDirectiva'
import { type EmployeeVicepresidenciaEjecutiva } from '../value-object/EmployeeVicepresidenciaEjecutiva'
import { type EmployeeVicepresidencia } from '../value-object/EmployeeVicepresidencia'
import { type EmployeeDepartamento } from '../value-object/EmployeeDepartamento'
import { type EmployeeCargo } from '../value-object/EmployeeCargo'
import { type EmployeeLocation } from '../value-object/EmployeeLocation'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'

export interface Employee {
	id: Primitives<EmployeeId>
	userName: Primitives<EmployeeUserName>
	type: EmployeeTypes
	name: Primitives<EmployeeName>
	lastName: Primitives<EmployeeLastName>
	email: Primitives<EmployeeEmail>
	isStillWorking: Primitives<EmployeeIsStillWorking>
	employeeCode: Primitives<EmployeeCode>
	nationality: Primitives<EmployeeNationality>
	cedula: Primitives<EmployeeCedula>
	locationId: Primitives<EmployeeLocation>
	directivaId: Primitives<EmployeeDirectiva>
	vicepresidenciaEjecutivaId: Primitives<EmployeeVicepresidenciaEjecutiva>
	vicepresidenciaId: Primitives<EmployeeVicepresidencia>
	departamentoId: Primitives<EmployeeDepartamento>
	cargoId: Primitives<EmployeeCargo>
	extension: Primitives<EmployeeExtension>[]
	phone: Primitives<EmployeePhoneNumber>[]
}

export type EmployeePrimitives = Omit<Employee, 'id'>

export type EmployeeParams = EmployeePrimitives & {
	id?: Primitives<EmployeeId>
}

export type EmployeeDto = Employee & {
	location: LocationDto | null
	directiva: DepartamentoDto | null
	vicepresidenciaEjecutiva: VicepresidenciaEjecutivaDto | null
	vicepresidencia: VicepresidenciaDto | null
	departamento: DepartamentoDto | null
	cargo: Cargo | null
	devices: DeviceDto[]
	history: HistoryDto[] | null
	updatedAt: string
}
