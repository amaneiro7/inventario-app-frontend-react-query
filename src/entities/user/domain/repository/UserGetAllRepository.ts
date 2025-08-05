import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type LoginUserDto } from '../dto/LoginUser.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all User entities.
 * It extends the generic `GetAllRepository` with `LoginUserDto` as the type parameter.
 */
export abstract class UserGetAllRepository extends GetAllRepository<LoginUserDto> {}