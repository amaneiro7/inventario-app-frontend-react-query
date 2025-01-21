import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type UserId } from '../entity/UserId'
import { type UserName } from '../entity/UserName'
import { type UserLastName } from '../entity/UserLastName'
import { type UserEmail } from '../entity/UserEmail'
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
