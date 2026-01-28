import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type MemoryRamTypeDto } from '../dto/MemoryRamType.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all MemoryRamType entities.
 * It extends the generic `GetAllRepository` with `MemoryRamTypeDto` as the type parameter.
 */
export abstract class MemoryRamTypeGetAllRepository extends GetAllRepository<MemoryRamTypeDto> {}
