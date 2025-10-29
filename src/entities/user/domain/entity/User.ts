import { UserParams, UserPrimitives } from '../dto/LoginUser.dto'
import { RoleId } from '@/entities/role/domain/value-object/RoleId'
import { RoleOptions } from '@/entities/role/domain/entity/RoleOptions'
import { EmployeeId } from '@/entities/employee/employee/domain/value-object/EmployeeId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Represents a User entity in the domain. Encapsulates user details and role information.
 */
export class User {
	constructor(
		private readonly employeeId: EmployeeId,
		private readonly roleId: RoleId
	) {}

	static create({ employeeId, roleId }: UserParams): User {
		return new User(new EmployeeId(employeeId), new RoleId(roleId))
	}

	/**
	 * Checks if a given role ID corresponds to a super admin or coordinator role.
	 * @param params - An object containing the role ID to check.
	 * @param params.roleId - The primitive value of the RoleId.
	 * @returns True if the role is ADMIN or COORDINADOR, false otherwise.
	 */
	static isSuperAdmin({ roleId }: { roleId: Primitives<RoleId> }): boolean {
		if (roleId === RoleOptions.ADMIN || roleId === RoleOptions.COORDINADOR) {
			return true
		}
		return false
	}

	/**
	 * Gets the primitive value of the user's first name.
	 */
	get employeeValue(): Primitives<EmployeeId> {
		return this.employeeId.value
	}

	/**
	 * Gets the primitive value of the user's role ID.
	 */
	get roleIdValue(): Primitives<RoleId> {
		return this.roleId.value
	}

	/**
	 * Converts the User entity to its primitive representation.
	 * @returns The primitive representation of the User.
	 */
	toPrimitives(): UserPrimitives {
		return {
			employeeId: this.employeeValue,
			roleId: this.roleIdValue
		}
	}
}
