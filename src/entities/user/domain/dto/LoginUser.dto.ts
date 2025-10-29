import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../value-objects/UserId'
import { type RoleId } from '@/entities/role/domain/value-object/RoleId'
import { type RoleDto } from '@/entities/role/domain/dto/Role.dto'
import { type EmployeeId } from '@/entities/employee/employee/domain/value-object/EmployeeId'
import { type UserStatus } from '../value-objects/UserStatus'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'
import { type PasswordChangeAt } from '../value-objects/PasswordChangeAt'
import { type LastLoginAt } from '../value-objects/LastLoginAt'

/**
 * Represents the core properties of a User entity.
 */
export interface User {
	id: Primitives<UserId>
	employeeId: Primitives<EmployeeId>
	roleId: Primitives<RoleId> // Temporal
	status: Primitives<UserStatus>
	passwordChangeAt: Primitives<PasswordChangeAt>
	lastLoginAt: Primitives<LastLoginAt>
}

/**
 * Represents the primitive properties of a User entity, excluding the ID.
 */
export type UserPrimitives = Omit<User, 'id' | 'passwordChangeAt' | 'lastLoginAt' | 'status'>

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
	updatedAt: string
	role: RoleDto
	employee: Omit<
		EmployeeDto,
		| 'location'
		| 'directiva'
		| 'vicepresidenciaEjecutiva'
		| 'vicepresidencia'
		| 'departamento'
		| 'cargo'
	>
}
