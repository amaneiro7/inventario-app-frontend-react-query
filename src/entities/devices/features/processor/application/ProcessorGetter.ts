import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ProcessorDto } from '../domain/dto/Processor.dto'
import { type ProcessorId } from '../domain/value-object/ProcessorId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

export class ProcessorGetter extends GetBaseService<Primitives<ProcessorId>, ProcessorDto> {}
