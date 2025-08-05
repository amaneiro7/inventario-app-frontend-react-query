import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type RoleDto } from '../dto/Role.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all Role entities.
 * It extends the generic `GetAllRepository` with `RoleDto` as the type parameter.
 */
export abstract class RoleGetAllRepository extends GetAllRepository<RoleDto> {}