import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type DirectivaDto } from '../dto/Directiva.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all Directiva entities.
 * It extends the generic `GetAllRepository` with `DirectivaDto` as the type parameter.
 */
export abstract class DirectivaGetAllRepository extends GetAllRepository<DirectivaDto> {}