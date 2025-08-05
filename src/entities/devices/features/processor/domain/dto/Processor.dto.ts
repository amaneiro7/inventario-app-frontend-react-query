import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ProcessorId } from '../value-object/ProcessorId'
import { type ProcessorName } from '../value-object/ProcessorName'
import { type ProcessorFrequency } from '../value-object/ProcessorFrequency'
import { type ProcessorHasThreads } from '../value-object/HasThreads'
import { type ProcessorCores } from '../value-object/ProcessorCores'
import { type ProcessorNumberModel } from '../value-object/ProcessorNumberModel'
import { type ProcessorProductCollection } from '../value-object/ProcessorProductCollection'

/**
 * @interface Processor
 * @description Representa la entidad de dominio `Processor` con sus propiedades básicas.
 * @property {Primitives<ProcessorId>} id - El identificador único del procesador.
 * @property {Primitives<ProcessorName>} name - El nombre del procesador.
 * @property {Primitives<ProcessorProductCollection>} productCollection - La colección de productos del procesador (ej. "Intel Core").
 * @property {Primitives<ProcessorNumberModel>} numberModel - El número de modelo del procesador (ej. "i7-10700K").
 * @property {Primitives<ProcessorCores>} cores - El número de núcleos del procesador.
 * @property {Primitives<ProcessorHasThreads>} threads - Indica si el procesador tiene hilos (threads).
 * @property {Primitives<ProcessorFrequency>} frequency - La frecuencia del procesador en GHz.
 */
export interface Processor {
	id: Primitives<ProcessorId>
	name: Primitives<ProcessorName>
	productCollection: Primitives<ProcessorProductCollection>
	numberModel: Primitives<ProcessorNumberModel>
	cores: Primitives<ProcessorCores>
	threads: Primitives<ProcessorHasThreads>
	frequency: Primitives<ProcessorFrequency>
}

/**
 * @typedef {Object} ProcessorPrimitives
 * @description Representa la forma primitiva de una entidad `Processor` para la persistencia.
 * Excluye el `id` y `name` ya que pueden ser generados o derivados.
 * @property {Primitives<ProcessorProductCollection>} productCollection - La colección de productos del procesador.
 * @property {Primitives<ProcessorNumberModel>} numberModel - El número de modelo del procesador.
 * @property {Primitives<ProcessorCores>} cores - El número de núcleos del procesador.
 * @property {Primitives<ProcessorHasThreads>} threads - Indica si el procesador tiene hilos.
 * @property {Primitives<ProcessorFrequency>} frequency - La frecuencia del procesador.
 */
export type ProcessorPrimitives = Omit<Processor, 'id' | 'name'>

/**
 * @typedef {Object} ProcessorParams
 * @description Representa los parámetros para crear o actualizar una entidad `Processor`.
 * Incluye todas las propiedades de `ProcessorPrimitives` y opcionalmente el `id`.
 * @extends {Omit<Processor, 'id' | 'name'>}
 * @property {Primitives<ProcessorId>} [id] - El identificador único del procesador (opcional para creación).
 */
export type ProcessorParams = Omit<Processor, 'id' | 'name'> & {
	id?: Primitives<ProcessorId>
}

/**
 * @interface ProcessorDto
 * @description Data Transfer Object (DTO) para una entidad `Processor`.
 * @extends {Processor}
 */
export type ProcessorDto = Processor