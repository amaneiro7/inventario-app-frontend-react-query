import { UserPrimitives } from '../dto/LoginUser.dto'
import { UserName } from '../value-objects/UserName'
import { UserLastName } from '../value-objects/UserLastName'
import { UserEmail } from '../value-objects/UserEmail'
import { RoleId } from '@/entities/role/domain/value-object/RoleId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { RoleOptions } from '@/entities/role/domain/entity/RoleOptions'

/**
 * Represents a User entity in the domain. Encapsulates user details and role information.
 */
export class User {
	/**
	 * Constructs a new User instance.
	 * @param name - The user's first name.
	 * @param lastName - The user's last name.
	 * @param email - The user's email address.
	 * @param roleId - The ID of the user's role.
	 */
	constructor(
		private readonly name: UserName,
		private readonly lastName: UserLastName,
		private readonly email: UserEmail,
		private readonly roleId: RoleId
	) {}

	/**
	 * Creates a new User instance from primitive values.
	 * @param params - The primitive values for creating a User.
	 * @returns A new User instance.
	 */
	static create({ name, email, lastName, roleId }: UserPrimitives): User {
		return new User(
			new UserName(name),
			new UserLastName(lastName),
			new UserEmail(email),
			new RoleId(roleId)
		)
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
	get nameValue(): Primitives<UserName> {
		return this.name.value
	}

	/**
	 * Gets the primitive value of the user's last name.
	 */
	get lastNameValue(): Primitives<UserLastName> {
		return this.lastName.value
	}

	/**
	 * Gets the primitive value of the user's email address.
	 */
	get emailValue(): Primitives<UserEmail> {
		return this.email.value
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
			name: this.nameValue,
			lastName: this.lastNameValue,
			email: this.emailValue,
			roleId: this.roleIdValue
		}
	}
}