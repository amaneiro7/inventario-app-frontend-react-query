import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type UserId } from '../value-objects/UserId'
import { type UserPrimitives } from '../dto/LoginUser.dto'

export abstract class UserSaveRepository extends SaveRepository<
	Primitives<UserId>,
	UserPrimitives
> {}
