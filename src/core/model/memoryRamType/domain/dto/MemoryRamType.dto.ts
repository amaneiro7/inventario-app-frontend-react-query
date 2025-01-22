import { Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { MemoryRamTypeId } from '../value-object/MemoryRamTypeId'
import { MemoryRamTypeName } from '../value-object/MemoryRamTypeName'

export interface MemoryRamTyme {
	id: Primitives<MemoryRamTypeId>
	name: Primitives<MemoryRamTypeName>
}

export type MemoryRamTypeDto = MemoryRamTyme
