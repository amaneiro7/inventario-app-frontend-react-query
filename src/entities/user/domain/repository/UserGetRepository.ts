import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type UserId } from '../value-objects/UserId'
import { type LoginUserDto } from '../dto/LoginUser.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Abstract class for a repository that provides methods for retrieving a single User entity.
 * It extends the generic `GetRepository` with `Primitives<UserId>` as the ID type and `LoginUserDto` as the entity type.
 */
export abstract class UserGetRepository extends GetRepository<Primitives<UserId>, LoginUserDto> {}