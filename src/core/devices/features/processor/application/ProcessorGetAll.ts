import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type ProcessorDto } from '../domain/dto/Processor.dto'

export class ProcessorGetAll extends GetAllBaseService<ProcessorDto> {}
