import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type MemoryRamTypeDto } from '../dto/MemoryRamType.dto'

export abstract class MemoryRamTypeGetAllRepository extends GetAllRepository<MemoryRamTypeDto> {}
