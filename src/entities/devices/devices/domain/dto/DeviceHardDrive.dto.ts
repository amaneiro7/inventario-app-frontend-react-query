import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceParams, type DevicePrimitives } from './Device.dto'
import { type CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { type HardDriveHealth } from '../value-object/HardDriveHealth'
import { type HardDriveCapacityId } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/value-object/HardDriveCapacityId'
import { type HardDriveTypeId } from '@/entities/devices/features/hardDrive/hardDriveType/domain/value-object/HardDriveTypeId'
import { type HardDriveCapacityDto } from '@/entities/devices/features/hardDrive/hardDriveCapacity/domain/dto/HardDriveCapacity.dto'
import { type HardDriveTypeDto } from '@/entities/devices/features/hardDrive/hardDriveType/domain/dto/HardDriveType.dto'

export type DeviceHardDrivePrimitives = DevicePrimitives & {
	health: Primitives<HardDriveHealth>
	hardDriveCapacityId: Primitives<HardDriveCapacityId>
	hardDriveTypeId: Primitives<HardDriveTypeId>
}

export type DeviceHardDriveParams = DeviceParams & {
	categoryId: CategoryOptions.HARDDRIVE
	health: Primitives<HardDriveHealth>
	hardDriveCapacityId: Primitives<HardDriveCapacityId>
	hardDriveTypeId: Primitives<HardDriveTypeId>
}

export interface DeviceHardDriveDto {
	health: Primitives<HardDriveHealth>
	hardDriveCapacityId: Primitives<HardDriveCapacityId>
	hardDriveTypeId: Primitives<HardDriveTypeId>
	hardDriveCapacity: HardDriveCapacityDto
	hardDriveType: HardDriveTypeDto
}
