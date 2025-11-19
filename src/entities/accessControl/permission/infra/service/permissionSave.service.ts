import { fetching } from '@/shared/api/api'
import { type PermissionSaveRepository } from '../../domain/repository/PermissionSaveRepository'
import { type PermissionPrimitives } from '../../domain/dto/Permission.dto'
import { permissionUrl } from '../../domain/entity/baseUrl'

/**
 * `PermissionSaveService`
 * @class
 * @implements {PermissionSaveRepository}
 * @description Implementación concreta del repositorio `PermissionSaveRepository` para guardar y actualizar marcas.
 * Utiliza la función `fetching` para realizar las peticiones HTTP a la API.
 */
export class PermissionSaveService implements PermissionSaveRepository {
	/**
	 * Guarda una nueva marca.
	 * @param {{ payload: PermissionPrimitives }} props - Objeto que contiene los datos primitivos de la marca a guardar.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */ async save({ payload }: { payload: PermissionPrimitives }): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: permissionUrl, data: payload })
	}

	/**
	 * Actualiza una marca existente.
	 * @param {{ id: string; payload: PermissionPrimitives }} props - Objeto que contiene el ID de la marca a actualizar y sus nuevos datos primitivos.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */ async update({
		id,
		payload
	}: {
		id: string
		payload: PermissionPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${permissionUrl}/${id}`,
			data: payload
		})
	}
}
