import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type ProcessorDto } from '../dto/Processor.dto'

export abstract class ProcessorGetAllRepository extends GetAllRepository<ProcessorDto> {}
