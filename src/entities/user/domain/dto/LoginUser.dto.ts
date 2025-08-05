import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../value-objects/UserId'
import { type UserName } from '../value-objects/UserName'
import { type UserLastName } from '../value-objects/UserLastName'
import { type UserEmail } from '../value-objects/UserEmail'
import { type RoleId } from '@/entities/role/domain/value-object/RoleId'
import { type RoleDto } from '@/entities/role/domain/dto/Role.dto'

/**
 * Represents the core properties of a User entity.
 */
export interface User {
	id: Primitives<UserId>
	name: Primitives<UserName>
	lastName: Primitives<UserLastName>
	email: Primitives<UserEmail>
	roleId: Primitives<RoleId>
}

/**
 * Represents the primitive properties of a User entity, excluding the ID.
 */
export type UserPrimitives = Omit<User, 'id'>

/**
 * Represents the parameters used for creating or updating a User entity.
 * It includes all primitive properties and an optional ID for update operations.
 */
export type UserParams = UserPrimitives & {
	id?: Primitives<UserId> | undefined
}

/**
 * Represents the Data Transfer Object (DTO) for a User entity, including full Role details and update timestamp.
 */
export type LoginUserDto = User & {
	role: RoleDto
	updatedAt: string
}