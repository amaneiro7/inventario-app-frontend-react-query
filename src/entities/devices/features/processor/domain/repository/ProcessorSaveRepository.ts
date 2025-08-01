import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ProcessorId } from '../value-object/ProcessorId'
import { type ProcessorPrimitives } from '../dto/Processor.dto'

export abstract class ProcessorSaveRepository extends SaveRepository<
	Primitives<ProcessorId>,
	ProcessorPrimitives
> {}
