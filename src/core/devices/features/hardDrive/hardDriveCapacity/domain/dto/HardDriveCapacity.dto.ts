import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type HardDriveCapacityId } from '../value-object/HardDriveCapacityId'
import { type HardDriveCapacityName } from '../value-object/HardDriveCapacityName'

export interface HardDriveCapacity {
	id: Primitives<HardDriveCapacityId>
	name: Primitives<HardDriveCapacityName>
}

export type HardDriveCapacityDto = HardDriveCapacity
