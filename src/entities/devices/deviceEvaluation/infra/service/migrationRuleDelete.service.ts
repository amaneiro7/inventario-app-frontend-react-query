import { fetching } from '@/shared/api/api'
import { migrationRuleUrl } from '../../domain/entity/baseUrl'
import { type MigrationRuleDeleteRepository } from '../../domain/repository/MigrationRuleDeleteRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type MigrationRuleId } from '../../domain/value-object/MigrationRuleId'

/**
 * `MigrationRuleDeleteService`
 * @class
 * @implements {MigrationRuleDeleteRepository}
 * @description Implementación concreta del repositorio `MigrationRuleDeleteRepository` para eliminar una regla de migración.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class MigrationRuleDeleteService implements MigrationRuleDeleteRepository {
	/**
	 * Elimina una regla de migración por su ID.
	 * @param {{ id: Primitives<MigrationRuleId> }} props - Objeto que contiene el ID de la regla de migración.
	 * @returns {Promise<void>} Una promesa que se resuelve cuando la regla de migración es eliminada.
	 */
	async deleteById({ id }: { id: Primitives<MigrationRuleId> }): Promise<void> {
		return await fetching<void>({
			url: `${migrationRuleUrl}/${id}`,
			method: 'DELETE'
		})
	}
}
