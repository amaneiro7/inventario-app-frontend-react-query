import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type StatusId } from '../value-object/StatusId'
import { type StatusName } from '../value-object/StatusName'

/**
 * Represents the core properties of a Status entity.
 */
export interface Status {
	id: Primitives<StatusId>
	name: Primitives<StatusName>
}

/**
 * Represents the primitive properties of a Status entity, excluding the ID.
 */
export type StatusPrimitives = Omit<Status, 'id'>

/**
 * Represents the Data Transfer Object (DTO) for a Status entity.
 * In this case, it's identical to the base `Status` interface.
 */
export type StatusDto = Status
