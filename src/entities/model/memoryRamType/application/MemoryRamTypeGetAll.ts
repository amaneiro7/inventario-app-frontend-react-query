import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type MemoryRamTypeDto } from '../domain/dto/MemoryRamType.dto'

/**
 * Service class for retrieving all MemoryRamType entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type MemoryRamTypeDto.
 */
export class MemoryRamTypeGetAll extends GetAllBaseService<MemoryRamTypeDto> {}
