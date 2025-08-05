import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserId } from '../value-objects/UserId'
import { type UserPrimitives } from '../dto/LoginUser.dto'

/**
 * Abstract class for a repository that provides methods for saving (creating and updating) User entities.
 * It extends the generic `SaveRepository` with `Primitives<UserId>` as the ID type and `UserPrimitives` as the entity type.
 */
export abstract class UserSaveRepository extends SaveRepository<
	Primitives<UserId>,
	UserPrimitives
> {}