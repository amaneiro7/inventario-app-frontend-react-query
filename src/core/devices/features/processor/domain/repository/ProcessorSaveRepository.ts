import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ProcessorId } from '../value-object/ProcessorId'
import { type ProcessorPrimitives } from '../dto/Processor.dto'

export abstract class ProcessorSaveRepository extends SaveRepository<
	Primitives<ProcessorId>,
	ProcessorPrimitives
> {}
