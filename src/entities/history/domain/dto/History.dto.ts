import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type HistoryId } from '../value-object/HistoryId'
import { type DeviceId } from '@/entities/devices/devices/domain/value-object/DeviceId'
import { type UserId } from '@/entities/user/domain/value-objects/UserId'
import { type EmployeeId } from '@/entities/employee/employee/domain/value-object/EmployeeId'
import { type HistoryActionTypes } from '../value-object/HistoryAction'
import { type DeviceDto } from '@/entities/devices/devices/domain/dto/Device.dto'
import { type LoginUserDto } from '@/entities/user/domain/dto/LoginUser.dto'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'

/**
 * Represents a change in a historical record, showing old and new values.
 */
interface Cambio {
	oldValue: any
	newValue: any
}

/**
 * Represents the core properties of a History entity.
 */
export interface History {
	id: Primitives<HistoryId>
	cambios: Record<string, Cambio>
	deviceId: Primitives<DeviceId>
	userId: Primitives<UserId>
	employeeId: Primitives<EmployeeId>
	action: HistoryActionTypes
	oldData: object
	newData: object
	createdAt: string
	updatedAt: string
}

/**
 * Represents the primitive properties of a History entity, excluding the ID.
 */
export type HistoryPrimitives = Omit<History, 'id'>

/**
 * Represents the Data Transfer Object (DTO) for a History entity,
 * including full details of the associated device, user, and employee.
 */
export type HistoryDto = History & {
	device: DeviceDto
	user: LoginUserDto
	employee: EmployeeDto
}