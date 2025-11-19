import { fetching } from '@/shared/api/api'
import { type PermissionGroupSaveRepository } from '../../domain/repository/PermissionGroupSaveRepository'
import { type PermissionGroupPrimitives } from '../../domain/dto/PermissionGroup.dto'
import { permissionGroupUrl } from '../../domain/entity/baseUrl'

/**
 * `PermissionGroupSaveService`
 * @class
 * @implements {PermissionGroupSaveRepository}
 * @description Implementación concreta del repositorio `PermissionGroupSaveRepository` para guardar y actualizar marcas.
 * Utiliza la función `fetching` para realizar las peticiones HTTP a la API.
 */
export class PermissionGroupSaveService implements PermissionGroupSaveRepository {
	/**
	 * Guarda una nueva marca.
	 * @param {{ payload: PermissionGroupPrimitives }} props - Objeto que contiene los datos primitivos de la marca a guardar.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */ async save({
		payload
	}: {
		payload: PermissionGroupPrimitives
	}): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: permissionGroupUrl, data: payload })
	}

	/**
	 * Actualiza una marca existente.
	 * @param {{ id: string; payload: PermissionGroupPrimitives }} props - Objeto que contiene el ID de la marca a actualizar y sus nuevos datos primitivos.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */ async update({
		id,
		payload
	}: {
		id: string
		payload: PermissionGroupPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${permissionGroupUrl}/${id}`,
			data: payload
		})
	}
}
