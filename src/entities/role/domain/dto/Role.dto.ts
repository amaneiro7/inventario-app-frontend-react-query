import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type RoleId } from '../value-object/RoleId'
import { type RoleName } from '../value-object/RoleName'

/**
 * Represents the core properties of a Role entity.
 */
export interface Role {
	id: Primitives<RoleId>
	name: Primitives<RoleName>
}

/**
 * Represents the Data Transfer Object (DTO) for a Role entity.
 * In this case, it's identical to the base `Role` interface.
 */
export type RoleDto = Role