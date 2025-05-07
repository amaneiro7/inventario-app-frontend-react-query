import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type LoginUserDto } from '../domain/dto/LoginUser.dto'
import { type UserId } from '../domain/value-objects/UserId'

export class UserGetter extends GetBaseService<Primitives<UserId>, LoginUserDto> {}
