import { fetching } from '@/shared/api/api'
import { type BrandSaveRepository } from '../../domain/repository/BrandSaveRepository'
import { type BrandPrimitives } from '../../domain/dto/Brand.dto'
import { brandUrl } from '../../domain/entity/baseUrl'

/**
 * `BrandSaveService`
 * @class
 * @implements {BrandSaveRepository}
 * @description Implementación concreta del repositorio `BrandSaveRepository` para guardar y actualizar marcas.
 * Utiliza la función `fetching` para realizar las peticiones HTTP a la API.
 */
export class BrandSaveService implements BrandSaveRepository {
	/**
	 * Guarda una nueva marca.
	 * @param {{ payload: BrandPrimitives }} props - Objeto que contiene los datos primitivos de la marca a guardar.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */ async save({ payload }: { payload: BrandPrimitives }): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: brandUrl, data: payload })
	}

	/**
	 * Actualiza una marca existente.
	 * @param {{ id: string; payload: BrandPrimitives }} props - Objeto que contiene el ID de la marca a actualizar y sus nuevos datos primitivos.
	 * @returns {Promise<{ message: string }>} Una promesa que se resuelve con un mensaje de éxito.
	 */ async update({
		id,
		payload
	}: {
		id: string
		payload: BrandPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${brandUrl}/${id}`,
			data: payload
		})
	}
}
