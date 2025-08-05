import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type LoginUserDto } from '../domain/dto/LoginUser.dto'
import { type UserId } from '../domain/value-objects/UserId'

/**
 * Service class for retrieving a single User entity by its ID.
 * It extends GetBaseService, providing generic functionality for fetching a single record
 * of type LoginUserDto using a UserId primitive as the identifier.
 */
export class UserGetter extends GetBaseService<Primitives<UserId>, LoginUserDto> {}