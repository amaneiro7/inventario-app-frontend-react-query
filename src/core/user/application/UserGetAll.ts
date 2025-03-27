import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type LoginUserDto } from '../domain/dto/LoginUser.dto'

export class UserGetAll extends GetAllBaseService<LoginUserDto> {}
