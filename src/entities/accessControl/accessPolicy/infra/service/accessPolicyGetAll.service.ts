import { fetching } from '@/shared/api/api'
import { type AccessPolicyGetAllRepository } from '../../domain/repository/AccessPolicyGetAllRepository'
import { type AccessPolicyDto } from '../../domain/dto/AccessPolicy.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { accessPolicyUrl } from '../../domain/entity/baseUrl'

/**
 * `AccessPolicyGetAllService`
 * @class
 * @implements {AccessPolicyGetAllRepository}
 * @description Implementación concreta del repositorio `AccessPolicyGetAllRepository` para obtener todas las marcas.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class AccessPolicyGetAllService implements AccessPolicyGetAllRepository {
	/**
	 * Obtiene todas las marcas, opcionalmente filtradas por parámetros de consulta.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<AccessPolicyDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene las marcas.
	 */ async getAll(queryParams?: string): Promise<Response<AccessPolicyDto>> {
		return await fetching({ url: `${accessPolicyUrl}?${queryParams}`, method: 'GET' })
	}
}
