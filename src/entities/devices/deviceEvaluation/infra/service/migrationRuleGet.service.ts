import { fetching } from '@/shared/api/api'
import { migrationRuleUrl } from '../../domain/entity/baseUrl'
import { type MigrationRuleGetRepository } from '../../domain/repository/MigrationRuleGetRepository'
import { type MigrationRuleDto } from '../../domain/dto/MigrationRule.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type MigrationRuleId } from '../../domain/value-object/MigrationRuleId'

/**
 * `MigrationRuleGetService`
 * @class
 * @implements {MigrationRuleGetRepository}
 * @description Implementación concreta del repositorio `MigrationRuleGetRepository` para obtener una marca.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class MigrationRuleGetService implements MigrationRuleGetRepository {
	/**
	 * Obtiene una marca por su ID.
	 * @param {{ id: Primitives<MigrationRuleId> }} props - Objeto que contiene el ID de la marca.
	 * @returns {Promise<MigrationRuleDto>} Una promesa que se resuelve con el DTO de la marca encontrada.
	 */
	async getById({ id }: { id: Primitives<MigrationRuleId> }): Promise<MigrationRuleDto> {
		return await fetching<MigrationRuleDto>({
			url: `${migrationRuleUrl}/${id}`,
			method: 'GET'
		})
	}
}
