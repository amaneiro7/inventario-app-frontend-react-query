import { fetching } from '@/shared/api/api'
import { type PermissionGetAllRepository } from '../../domain/repository/PermissionGetAllRepository'
import { type PermissionDto } from '../../domain/dto/Permission.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { permissionUrl } from '../../domain/entity/baseUrl'

/**
 * `PermissionGetAllService`
 * @class
 * @implements {PermissionGetAllRepository}
 * @description Implementación concreta del repositorio `PermissionGetAllRepository` para obtener todas las marcas.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class PermissionGetAllService implements PermissionGetAllRepository {
	/**
	 * Obtiene todas las marcas, opcionalmente filtradas por parámetros de consulta.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<PermissionDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene las marcas.
	 */ async getAll(queryParams?: string): Promise<Response<PermissionDto>> {
		return await fetching({ url: `${permissionUrl}?${queryParams}`, method: 'GET' })
	}
}
