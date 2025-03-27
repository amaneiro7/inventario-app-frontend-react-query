import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type LoginUserDto } from '../dto/LoginUser.dto'

export abstract class UserGetAllRepository extends GetAllRepository<LoginUserDto> {}
