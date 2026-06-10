import { fetching } from '@/shared/api/api'
import { migrationRuleUrl } from '../../domain/entity/baseUrl'
import type { MigrationRuleSaveRepository } from '../../domain/repository/MigrationRuleSaveRepository'
import type { MigrationRulePrimitives } from '../../domain/dto/MigrationRule.dto'

/**
 * `MigrationRuleSaveService`
 * @class
 * @implements {MigrationRuleSaveRepository}
 * @description Implementación concreta del repositorio `MigrationRuleSaveRepository` para guardar y actualizar marcas.
 * Utiliza la función `fetching` para realizar las peticiones HTTP a la API.
 */
export class MigrationRuleSaveService implements MigrationRuleSaveRepository {
	/**
	 * Guarda una nueva marca.
	 * @param {{ payload: MigrationRulePrimitives }} props - Objeto que contiene los datos primitivos de la marca a guardar.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */
	async save({ payload }: { payload: MigrationRulePrimitives }): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: migrationRuleUrl, data: payload })
	}

	/**
	 * Actualiza una marca existente.
	 * @param {{ id: string; payload: MigrationRulePrimitives }} props - Objeto que contiene el ID de la marca a actualizar y sus nuevos datos primitivos.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */
	async update({
		id,
		payload
	}: {
		id: string
		payload: MigrationRulePrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${migrationRuleUrl}/${id}`,
			data: payload
		})
	}
}
