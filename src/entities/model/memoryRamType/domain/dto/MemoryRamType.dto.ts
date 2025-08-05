import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { MemoryRamTypeId } from '../value-object/MemoryRamTypeId'
import { MemoryRamTypeName } from '../value-object/MemoryRamTypeName'

/**
 * Represents the core properties of a MemoryRamType entity.
 */
export interface MemoryRamTyme {
	id: Primitives<MemoryRamTypeId>
	name: Primitives<MemoryRamTypeName>
}

/**
 * Represents the Data Transfer Object (DTO) for a MemoryRamType entity.
 * In this case, it's identical to the base `MemoryRamTyme` interface.
 */
export type MemoryRamTypeDto = MemoryRamTyme