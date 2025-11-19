import { AccessPolicy } from '../domain/entity/AccessPolicy'
import { AccessPolicyId } from '../domain/value-object/AccessPolicyId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type AccessPolicySaveRepository } from '../domain/repository/AccessPolicySaveRepository'
import { type AccessPolicyParams } from '../domain/dto/AccessPolicy.dto'

/**
 * `AccessPolicyCreator`
 * @class
 * @description Clase de caso de uso para crear o actualizar entidades `AccessPolicy`.
 * Orquesta la lógica de negocio para persistir una marca y notificar eventos.
 */
export class AccessPolicyCreator {
	/**
	 * Crea una instancia de `AccessPolicyCreator`.
	 * @param {AccessPolicySaveRepository} repository - El repositorio para guardar o actualizar la marca.
	 * @param {EventManager} events - El gestor de eventos para notificar el estado de la operación.
	 */ constructor(
		readonly repository: AccessPolicySaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Ejecuta la creación o actualización de una marca.
	 * Si `params.id` está presente, actualiza la marca existente; de lo contrario, crea una nueva.
	 * Notifica el estado de la operación a través del gestor de eventos.
	 * @param {AccessPolicyParams} params - Los parámetros de la marca a crear o actualizar.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 * @throws {Error} Si ocurre un error durante la operación, se notifica y se lanza una excepción.
	 */ async create(params: AccessPolicyParams): Promise<{ message: string }> {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = AccessPolicy.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({ id: new AccessPolicyId(params.id).value, payload })
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
