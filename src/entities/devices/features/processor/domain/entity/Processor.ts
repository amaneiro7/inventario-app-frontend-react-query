import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ProcessorPrimitives } from '../dto/Processor.dto'
import { ProcessorFrequency } from '../value-object/ProcessorFrequency'
import { ProcessorCores } from '../value-object/ProcessorCores'
import { ProcessorHasThreads } from '../value-object/ProcessorHasThreads'
import { ProcessorNumberModel } from '../value-object/ProcessorNumberModel'
import { ProcessorProductCollection } from '../value-object/ProcessorCollection'

export class Processor {
	constructor(
		private productCollection: ProcessorProductCollection,
		private numberModel: ProcessorNumberModel,
		private cores: ProcessorCores,
		private threads: ProcessorHasThreads,
		private frequency: ProcessorFrequency
	) {}

	static create(params: ProcessorPrimitives): Processor {
		return new Processor(
			new ProcessorProductCollection(params.productCollection),
			new ProcessorNumberModel(params.numberModel),
			new ProcessorCores(params.cores),
			new ProcessorHasThreads(params.threads),
			new ProcessorFrequency(params.frequency)
		)
	}

	get productCollectionValue(): Primitives<ProcessorProductCollection> {
		return this.productCollection.value
	}
	get numberModelValue(): Primitives<ProcessorNumberModel> {
		return this.numberModel.value
	}
	get coresValue(): Primitives<ProcessorCores> {
		return this.cores.value
	}
	get hasThreadsValue(): Primitives<ProcessorHasThreads> {
		return this.threads.value
	}
	get frequencyValue(): Primitives<ProcessorFrequency> {
		return this.frequency.value
	}

	toPrimitives(): ProcessorPrimitives {
		return {
			productCollection: this.productCollectionValue,
			numberModel: this.numberModelValue,
			cores: this.coresValue,
			threads: this.hasThreadsValue,
			frequency: this.frequencyValue
		}
	}
}
