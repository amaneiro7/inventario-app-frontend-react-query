import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../value-objects/UserId'
import { type UserPrimitives } from '../dto/LoginUser.dto'

export abstract class UserSaveRepository extends SaveRepository<
	Primitives<UserId>,
	UserPrimitives
> {}
