import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type StatusDto } from '../dto/Status.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all Status entities.
 * It extends the generic `GetAllRepository` with `StatusDto` as the type parameter.
 */
export abstract class StatusGetAllRepository extends GetAllRepository<StatusDto> {}