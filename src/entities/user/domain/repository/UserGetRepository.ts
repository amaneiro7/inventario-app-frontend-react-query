import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type UserId } from '../value-objects/UserId'
import { type LoginUserDto } from '../dto/LoginUser.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export abstract class UserGetRepository extends GetRepository<Primitives<UserId>, LoginUserDto> {}
