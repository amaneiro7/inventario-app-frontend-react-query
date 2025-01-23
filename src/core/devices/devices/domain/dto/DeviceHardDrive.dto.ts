import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DeviceParams, type DevicePrimitives } from './Device.dto'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { type HardDriveHealth } from '../value-object/HardDriveHealth'
import { type HardDriveCapacityId } from '@/core/devices/features/hardDrive/hardDriveCapacity/domain/value-object/HardDriveCapacityId'
import { type HardDriveTypeId } from '@/core/devices/features/hardDrive/hardDriveType/domain/value-object/HardDriveTypeId'
import { type HardDriveCapacityDto } from '@/core/devices/features/hardDrive/hardDriveCapacity/domain/dto/HardDriveCapacity.dto'
import { type HardDriveTypeDto } from '@/core/devices/features/hardDrive/hardDriveType/domain/dto/HardDriveType.dto'

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
