import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type ProcessorDto } from '../dto/Processor.dto'
import { type ProcessorId } from '../value-object/ProcessorId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export abstract class ProcessorGetRepository extends GetRepository<
	Primitives<ProcessorId>,
	ProcessorDto
> {}
