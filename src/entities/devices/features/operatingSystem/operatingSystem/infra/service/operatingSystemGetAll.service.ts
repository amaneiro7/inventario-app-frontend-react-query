import { fetching } from '@/shared/api/api'
import { type OperatingSystemDto } from '../../domain/dto/OperatingSystem.dto'
import { type OperatingSystemGetAllRepository } from '../../domain/repository/OperatingSystemGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { operatingSystemUrl } from '../../domain/entity/baseUrl'

/**
 * @class OperatingSystemGetAllService
 * @implements {OperatingSystemGetAllRepository}
 * @description Implementación concreta del repositorio `OperatingSystemGetAllRepository` para obtener todos los sistemas operativos.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class OperatingSystemGetAllService implements OperatingSystemGetAllRepository {
	/**
	 * Obtiene todos los sistemas operativos, opcionalmente filtrados por parámetros de consulta.
	 * @param {string} queryParams - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<OperatingSystemDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene los sistemas operativos.
	 */	async getAll(queryParams: string): Promise<Response<OperatingSystemDto>> {
		return await fetching({
			url: `${operatingSystemUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}