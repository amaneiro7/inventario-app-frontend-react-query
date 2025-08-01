import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type MemoryRamTypeDto } from '../domain/dto/MemoryRamType.dto'

export class MemoryRamTypeGetAll extends GetAllBaseService<MemoryRamTypeDto> {}
