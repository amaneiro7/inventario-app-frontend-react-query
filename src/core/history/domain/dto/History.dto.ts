import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type HistoryId } from '../value-object/HistoryId'
import { type DeviceId } from '@/core/devices/devices/domain/value-object/DeviceId'
import { type UserId } from '@/core/user/domain/value-objects/UserId'
import { type EmployeeId } from '@/core/employee/employee/domain/value-object/EmployeeId'
import { type HistoryActionTypes } from '../value-object/HistoryAction'
import { type DeviceDto } from '@/core/devices/devices/domain/dto/Device.dto'
import { type LoginUserDto } from '@/core/user/domain/dto/LoginUser.dto'
import { type EmployeeDto } from '@/core/employee/employee/domain/dto/Employee.dto'

interface Cambio {
	oldValue: any
	newValue: any
}
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

export type HistoryPrimitives = Omit<History, 'id'>

export type HistoryDto = History & {
	device: DeviceDto
	user: LoginUserDto
	employee: EmployeeDto
}
