import { fetching } from '@/shared/api/api'
import { permissionUrl } from '../../domain/entity/baseUrl'
import { type PermissionGetRepository } from '../../domain/repository/PermissionGetRepository'
import { type PermissionDto } from '../../domain/dto/Permission.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type PermissionId } from '../../domain/value-object/PermissionId'

/**
 * `PermissionGetService`
 * @class
 * @implements {PermissionGetRepository}
 * @description Implementación concreta del repositorio `PermissionGetRepository` para obtener una marca.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class PermissionGetService implements PermissionGetRepository {
	/**
	 * Obtiene una marca por su ID.
	 * @param {{ id: Primitives<PermissionId> }} props - Objeto que contiene el ID de la marca.
	 * @returns {Promise<PermissionDto>} Una promesa que se resuelve con el DTO de la marca encontrada.
	 */ async getById({ id }: { id: Primitives<PermissionId> }): Promise<PermissionDto> {
		return await fetching<PermissionDto>({
			url: `${permissionUrl}/${id}`,
			method: 'GET'
		})
	}
}
