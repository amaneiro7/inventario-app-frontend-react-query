import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type HardDriveTypeId } from '../value-object/HardDriveTypeId'
import { type HardDriveTypeName } from '../value-object/HardDriveTypeName'

export interface HardDriveType {
	id: Primitives<HardDriveTypeId>
	name: Primitives<HardDriveTypeName>
}

export type HardDriveTypeDto = HardDriveType
