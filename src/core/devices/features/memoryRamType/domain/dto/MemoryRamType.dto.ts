import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type MemoryRamTypeId } from '../value-object/MemoryRamTypeId'
import { type MemoryRamTypeName } from '../value-object/MemoryRamTypeName'

export interface MemoryRamType {
	id: Primitives<MemoryRamTypeId>
	name: Primitives<MemoryRamTypeName>
}

export type MemoryRamTypePrimitives = Omit<MemoryRamType, 'id' | 'name'>

export type MemoryRamTypeDto = MemoryRamType
