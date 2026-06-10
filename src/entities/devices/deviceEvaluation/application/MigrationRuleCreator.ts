import { MigrationRule } from '../domain/entity/MigrationRule'
import { MigrationRuleId } from '../domain/value-object/MigrationRuleId'
import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'
import { type MigrationRuleSaveRepository } from '../domain/repository/MigrationRuleSaveRepository'
import { type MigrationRuleParams } from '../domain/dto/MigrationRule.dto'

/**
 * `MigrationRuleCreator`
 * @class
 * @description Clase de caso de uso para crear o actualizar entidades `MigrationRule`.
 * Orquesta la lógica de negocio para persistir una marca y notificar eventos.
 */
export class MigrationRuleCreator {
	/**
	 * Crea una instancia de `MigrationRuleCreator`.
	 * @param {MigrationRuleSaveRepository} repository - El repositorio para guardar o actualizar la marca.
	 * @param {EventManager} events - El gestor de eventos para notificar el estado de la operación.
	 */
	constructor(
		readonly repository: MigrationRuleSaveRepository,
		private readonly events: EventManager
	) {}

	/**
	 * Ejecuta la creación o actualización de una marca.
	 * Si `params.id` está presente, actualiza la marca existente; de lo contrario, crea una nueva.
	 * Notifica el estado de la operación a través del gestor de eventos.
	 * @param {MigrationRuleParams} params - Los parámetros de la marca a crear o actualizar.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 * @throws {Error} Si ocurre un error durante la operación, se notifica y se lanza una excepción.
	 */
	async create(params: MigrationRuleParams): Promise<{ message: string }> {
		// Notificar que ha empezado el proceso de creación o actualización
		this.events.notify({ type: 'loading' })
		try {
			const payload = MigrationRule.create(params).toPrimitives()
			const result = params.id
				? await this.repository.update({
						id: new MigrationRuleId(params.id).value,
						payload
					})
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
