import { fetching } from '@/shared/api/api'
import { permissionUrl } from '../../domain/entity/baseUrl'
import { type PermissionDeleteRepository } from '../../domain/repository/PermissionDeleteRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionId } from '../../domain/value-object/PermissionId'

/**
 * `PermissionGetService`
 * @class
 * @implements {PermissionGetRepository}
 * @description Implementación concreta del repositorio `PermissionGetRepository` para obtener una marca.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class PermissionDeleteService implements PermissionDeleteRepository {
	/**
	 * Obtiene una marca por su ID.
	 * @param {{ id: Primitives<PermissionId> }} props - Objeto que contiene el ID de la marca.
	 * @returns {Promise<PermissionDto>} Una promesa que se resuelve con el DTO de la marca encontrada.
	 */ async deleteById({ id }: { id: Primitives<PermissionId> }): Promise<void> {
		return await fetching<void>({
			url: `${permissionUrl}/${id}`,
			method: 'DELETE'
		})
	}
}
