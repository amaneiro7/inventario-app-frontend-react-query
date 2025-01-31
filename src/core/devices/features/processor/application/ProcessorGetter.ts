import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ProcessorDto } from '../domain/dto/Processor.dto'
import { type ProcessorId } from '../domain/value-object/ProcessorId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class ProcessorGetter extends GetBaseService<Primitives<ProcessorId>, ProcessorDto> {}
