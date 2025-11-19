import { fetching } from '@/shared/api/api'
import { type PermissionGroupGetAllRepository } from '../../domain/repository/PermissionGroupGetAllRepository'
import { type PermissionGroupDto } from '../../domain/dto/PermissionGroup.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { permissionGroupUrl } from '../../domain/entity/baseUrl'

/**
 * `PermissionGroupGetAllService`
 * @class
 * @implements {PermissionGroupGetAllRepository}
 * @description Implementación concreta del repositorio `PermissionGroupGetAllRepository` para obtener todas las marcas.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class PermissionGroupGetAllService implements PermissionGroupGetAllRepository {
	/**
	 * Obtiene todas las marcas, opcionalmente filtradas por parámetros de consulta.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<PermissionGroupDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene las marcas.
	 */ async getAll(queryParams?: string): Promise<Response<PermissionGroupDto>> {
		return await fetching({ url: `${permissionGroupUrl}?${queryParams}`, method: 'GET' })
	}
}
