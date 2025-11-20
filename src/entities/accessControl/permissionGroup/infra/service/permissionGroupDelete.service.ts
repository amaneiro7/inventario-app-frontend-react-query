import { fetching } from '@/shared/api/api'
import { permissionGroupUrl } from '../../domain/entity/baseUrl'
import { type PermissionGroupDeleteRepository } from '../../domain/repository/PermissionGroupDeleteRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionGroupId } from '../../domain/value-object/PermissionGroupId'

/**
 * `PermissionGroupGetService`
 * @class
 * @implements {PermissionGroupGetRepository}
 * @description Implementación concreta del repositorio `PermissionGroupGetRepository` para obtener una marca.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class PermissionGroupDeleteService implements PermissionGroupDeleteRepository {
	/**
	 * Obtiene una marca por su ID.
	 * @param {{ id: Primitives<PermissionGroupId> }} props - Objeto que contiene el ID de la marca.
	 * @returns {Promise<PermissionGroupDto>} Una promesa que se resuelve con el DTO de la marca encontrada.
	 */ async deleteById({ id }: { id: Primitives<PermissionGroupId> }): Promise<void> {
		return await fetching<void>({
			url: `${permissionGroupUrl}/${id}`,
			method: 'DELETE'
		})
	}
}
