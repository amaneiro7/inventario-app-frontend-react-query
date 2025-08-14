import { Processor } from '../domain/entity/Processor'
import { ProcessorId } from '../domain/value-object/ProcessorId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type ProcessorSaveRepository } from '../domain/repository/ProcessorSaveRepository'
import { type ProcessorParams } from '../domain/dto/Processor.dto'

/**
 * @class ProcessorCreator
 * @description Clase de caso de uso para crear o actualizar entidades `Processor`.
 * Orquesta la lógica de negocio para persistir un procesador y notificar eventos.
 */
export class ProcessorCreator {
	/**
	 * Crea una instancia de `ProcessorCreator`.
	 * @param {ProcessorSaveRepository} repository - El repositorio para guardar o actualizar el procesador.
	 * @param {EventManager} events - El gestor de eventos para notificar el estado de la operación.
	 */ constructor(
		readonly repository: ProcessorSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Ejecuta la creación o actualización de un procesador.
	 * Si `params.id` está presente, actualiza el procesador existente; de lo contrario, crea uno nuevo.
	 * Notifica el estado de la operación a través del gestor de eventos.
	 * @param {ProcessorParams} params - Los parámetros del procesador a crear o actualizar.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 * @throws {Error} Si ocurre un error durante la operación, se notifica y se lanza una excepción.
	 */ async create(params: ProcessorParams) {
		this.events.notify({ type: 'loading' })
		try {
			const payload = Processor.create(params).toPrimitives()
			// Guarda o actualiza el procesador basado en si existe un ID.
			const result = params.id
				? await this.repository.update({ id: new ProcessorId(params.id).value, payload })
				: await this.repository.save({ payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			return { message: errorMessage }
		}
	}
}
