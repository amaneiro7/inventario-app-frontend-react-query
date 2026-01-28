import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ProcessorPrimitives } from '../dto/Processor.dto'
import { ProcessorFrequency } from '../value-object/ProcessorFrequency'
import { ProcessorCores } from '../value-object/ProcessorCores'
import { ProcessorHasThreads } from '../value-object/HasThreads'
import { ProcessorNumberModel } from '../value-object/ProcessorNumberModel'
import { ProcessorProductCollection } from '../value-object/ProcessorProductCollection'

/**
 * @class Processor
 * @description Entidad de dominio que representa un procesador.
 * Encapsula las propiedades y la lógica de negocio para un procesador.
 */
export class Processor {
	/**
	 * Crea una instancia de `Processor`.
	 * @param {ProcessorProductCollection} productCollection - La colección de productos del procesador.
	 * @param {ProcessorNumberModel} numberModel - El número de modelo del procesador.
	 * @param {ProcessorCores} cores - El número de núcleos del procesador.
	 * @param {ProcessorHasThreads} threads - Indica si el procesador tiene hilos.
	 * @param {ProcessorFrequency} frequency - La frecuencia del procesador.
	 */ constructor(
		private productCollection: ProcessorProductCollection,
		private numberModel: ProcessorNumberModel,
		private cores: ProcessorCores,
		private threads: ProcessorHasThreads,
		private frequency: ProcessorFrequency
	) {}

	/**
	 * Crea una nueva instancia de `Processor` a partir de sus propiedades primitivas.
	 * @static
	 * @param {ProcessorPrimitives} params - Las propiedades primitivas del procesador.
	 * @returns {Processor} Una nueva instancia de `Processor`.
	 */ static create(params: ProcessorPrimitives): Processor {
		return new Processor(
			new ProcessorProductCollection(params.productCollection),
			new ProcessorNumberModel(params.numberModel),
			new ProcessorCores(params.cores),
			new ProcessorHasThreads(params.threads),
			new ProcessorFrequency(params.frequency)
		)
	}

	/**
	 * Obtiene el valor primitivo de la colección de productos del procesador.
	 * @type {Primitives<ProcessorProductCollection>}
	 */ get productCollectionValue(): Primitives<ProcessorProductCollection> {
		return this.productCollection.value
	}
	/**
	 * Obtiene el valor primitivo del número de modelo del procesador.
	 * @type {Primitives<ProcessorNumberModel>}
	 */ get numberModelValue(): Primitives<ProcessorNumberModel> {
		return this.numberModel.value
	}
	/**
	 * Obtiene el valor primitivo del número de núcleos del procesador.
	 * @type {Primitives<ProcessorCores>}
	 */ get coresValue(): Primitives<ProcessorCores> {
		return this.cores.value
	}
	/**
	 * Obtiene el valor primitivo de si el procesador tiene hilos.
	 * @type {Primitives<ProcessorHasThreads>}
	 */ get hasThreadsValue(): Primitives<ProcessorHasThreads> {
		return this.threads.value
	}
	/**
	 * Obtiene el valor primitivo de la frecuencia del procesador.
	 * @type {Primitives<ProcessorFrequency>}
	 */ get frequencyValue(): Primitives<ProcessorFrequency> {
		return this.frequency.value
	}

	/**
	 * Convierte la entidad `Processor` a su representación primitiva.
	 * @returns {ProcessorPrimitives} La representación primitiva del procesador.
	 */ toPrimitives(): ProcessorPrimitives {
		return {
			productCollection: this.productCollectionValue,
			numberModel: this.numberModelValue,
			cores: this.coresValue,
			threads: this.hasThreadsValue,
			frequency: this.frequencyValue
		}
	}
}
