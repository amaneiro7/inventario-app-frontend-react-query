import { Permission } from '../domain/entity/Permission'
import { PermissionId } from '../domain/value-object/PermissionId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type PermissionSaveRepository } from '../domain/repository/PermissionSaveRepository'
import { type PermissionParams } from '../domain/dto/Permission.dto'

/**
 * `PermissionCreator`
 * @class
 * @description Clase de caso de uso para crear o actualizar entidades `Permission`.
 * Orquesta la lógica de negocio para persistir una marca y notificar eventos.
 */
export class PermissionCreator {
	/**
	 * Crea una instancia de `PermissionCreator`.
	 * @param {PermissionSaveRepository} repository - El repositorio para guardar o actualizar la marca.
	 * @param {EventManager} events - El gestor de eventos para notificar el estado de la operación.
	 */ constructor(
		readonly repository: PermissionSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Ejecuta la creación o actualización de una marca.
	 * Si `params.id` está presente, actualiza la marca existente; de lo contrario, crea una nueva.
	 * Notifica el estado de la operación a través del gestor de eventos.
	 * @param {PermissionParams} params - Los parámetros de la marca a crear o actualizar.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 * @throws {Error} Si ocurre un error durante la operación, se notifica y se lanza una excepción.
	 */ async create(params: PermissionParams): Promise<{ message: string }> {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = Permission.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new PermissionId(params.id).value, payload })
				: await this.repository.save({ payload })
			this.events.notify({ type: 'success', message: result.message })
			return result
		} catch (error) {
			// Notifica el error y lanza una excepción.
			const errorMessage = `${error}`
			this.events.notify({ type: 'error', message: errorMessage })
			throw new Error(errorMessage)
		}
	}
}
