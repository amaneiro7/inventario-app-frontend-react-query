import { fetching } from '@/shared/api/api'
import { type MigrationRuleGetAllRepository } from '../../domain/repository/MigrationRuleGetAllRepository'
import { type MigrationRuleDto } from '../../domain/dto/MigrationRule.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { migrationRuleUrl } from '../../domain/entity/baseUrl'

/**
 * `MigrationRuleGetAllService`
 * @class
 * @implements {MigrationRuleGetAllRepository}
 * @description Implementación concreta del repositorio `MigrationRuleGetAllRepository` para obtener todas las marcas.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class MigrationRuleGetAllService implements MigrationRuleGetAllRepository {
	/**
	 * Obtiene todas las marcas, opcionalmente filtradas por parámetros de consulta.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<MigrationRuleDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene las marcas.
	 */
	async getAll(queryParams?: string): Promise<Response<MigrationRuleDto>> {
		return await fetching({ url: `${migrationRuleUrl}?${queryParams}`, method: 'GET' })
	}
}
