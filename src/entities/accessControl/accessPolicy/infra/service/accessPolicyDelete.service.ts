import { fetching } from '@/shared/api/api'
import { accessPolicyUrl } from '../../domain/entity/baseUrl'
import { type AccessPolicyDeleteRepository } from '../../domain/repository/AccessPolicyDeleteRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type AccessPolicyId } from '../../domain/value-object/AccessPolicyId'

/**
 * `AccessPolicyGetService`
 * @class
 * @implements {AccessPolicyGetRepository}
 * @description Implementación concreta del repositorio `AccessPolicyGetRepository` para obtener una marca.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class AccessPolicyDeleteService implements AccessPolicyDeleteRepository {
	/**
	 * Obtiene una marca por su ID.
	 * @param {{ id: Primitives<AccessPolicyId> }} props - Objeto que contiene el ID de la marca.
	 * @returns {Promise<AccessPolicyDto>} Una promesa que se resuelve con el DTO de la marca encontrada.
	 */ async deleteById({ id }: { id: Primitives<AccessPolicyId> }): Promise<void> {
		return await fetching<void>({
			url: `${accessPolicyUrl}/${id}`,
			method: 'DELETE'
		})
	}
}
