import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ProcessorId } from '../value-object/ProcessorId'
import { type ProcessorName } from '../value-object/ProcessorName'
import { type ProcessorFrequency } from '../value-object/ProcessorFrequency'
import { type ProcessorHasThreads } from '../value-object/ProcessorHasThreads'
import { type ProcessorCores } from '../value-object/ProcessorCores'
import { type ProcessorNumberModel } from '../value-object/ProcessorNumberModel'
import { type ProcessorProductCollection } from '../value-object/ProcessorCollection'

export interface Processor {
	id: Primitives<ProcessorId>
	name: Primitives<ProcessorName>
	productCollection: Primitives<ProcessorProductCollection>
	numberModel: Primitives<ProcessorNumberModel>
	cores: Primitives<ProcessorCores>
	threads: Primitives<ProcessorHasThreads>
	frequency: Primitives<ProcessorFrequency>
}

export type ProcessorPrimitives = Omit<Processor, 'id' | 'name'>

export type ProcessorDto = Processor
