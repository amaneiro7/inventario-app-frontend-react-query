import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type UserId } from '../value-objects/UserId'
import { type UserName } from '../value-objects/UserName'
import { type UserLastName } from '../value-objects/UserLastName'
import { type UserEmail } from '../value-objects/UserEmail'
import { type RoleId } from '@/core/role/domain/value-object/RoleId'
import { type RoleDto } from '@/core/role/domain/dto/Role.dto'

export interface LoginUserDto {
	id: Primitives<UserId>
	name: Primitives<UserName>
	lastName: Primitives<UserLastName>
	email: Primitives<UserEmail>
	roleId: Primitives<RoleId>
	role: RoleDto
}
