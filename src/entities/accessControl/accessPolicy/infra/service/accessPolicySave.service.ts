import { fetching } from '@/shared/api/api'
import { type AccessPolicySaveRepository } from '../../domain/repository/AccessPolicySaveRepository'
import { type AccessPolicyPrimitives } from '../../domain/dto/AccessPolicy.dto'
import { accessPolicyUrl } from '../../domain/entity/baseUrl'

/**
 * `AccessPolicySaveService`
 * @class
 * @implements {AccessPolicySaveRepository}
 * @description Implementación concreta del repositorio `AccessPolicySaveRepository` para guardar y actualizar marcas.
 * Utiliza la función `fetching` para realizar las peticiones HTTP a la API.
 */
export class AccessPolicySaveService implements AccessPolicySaveRepository {
	/**
	 * Guarda una nueva marca.
	 * @param {{ payload: AccessPolicyPrimitives }} props - Objeto que contiene los datos primitivos de la marca a guardar.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */ async save({ payload }: { payload: AccessPolicyPrimitives }): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: accessPolicyUrl, data: payload })
	}

	/**
	 * Actualiza una marca existente.
	 * @param {{ id: string; payload: AccessPolicyPrimitives }} props - Objeto que contiene el ID de la marca a actualizar y sus nuevos datos primitivos.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */ async update({
		id,
		payload
	}: {
		id: string
		payload: AccessPolicyPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${accessPolicyUrl}/${id}`,
			data: payload
		})
	}
}
