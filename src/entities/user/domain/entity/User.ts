import { UserPrimitives } from '../dto/LoginUser.dto'
import { UserName } from '../value-objects/UserName'
import { UserLastName } from '../value-objects/UserLastName'
import { UserEmail } from '../value-objects/UserEmail'
import { RoleId } from '@/entities/role/domain/value-object/RoleId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { RoleOptions } from '@/entities/role/domain/entity/RoleOptions'

export class User {
	constructor(
		private readonly name: UserName,
		private readonly lastName: UserLastName,
		private readonly email: UserEmail,
		private readonly roleId: RoleId
	) {}

	static create({ name, email, lastName, roleId }: UserPrimitives): User {
		return new User(
			new UserName(name),
			new UserLastName(lastName),
			new UserEmail(email),
			new RoleId(roleId)
		)
	}

	static isSuperAdmin({ roleId }: { roleId: Primitives<RoleId> }): boolean {
		if (roleId === RoleOptions.ADMIN || roleId === RoleOptions.COORDINADOR) {
			return true
		}
		return false
	}

	get nameValue(): Primitives<UserName> {
		return this.name.value
	}

	get lastNameValue(): Primitives<UserLastName> {
		return this.lastName.value
	}

	get emailValue(): Primitives<UserEmail> {
		return this.email.value
	}

	get roleIdValue(): Primitives<RoleId> {
		return this.roleId.value
	}

	toPrimitives(): UserPrimitives {
		return {
			name: this.nameValue,
			lastName: this.lastNameValue,
			email: this.emailValue,
			roleId: this.roleIdValue
		}
	}
}
