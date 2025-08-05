import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type LoginUserDto } from '../domain/dto/LoginUser.dto'

/**
 * Service class for retrieving all User entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type LoginUserDto.
 */
export class UserGetAll extends GetAllBaseService<LoginUserDto> {}