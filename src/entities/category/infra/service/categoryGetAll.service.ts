import { fetching } from '@/shared/api/api'
import { type CategoryGetAllRepository } from '@/entities/category/domain/repository/CategoryGetAllRepository'
import { type CategoryDto } from '@/entities/category/domain/dto/Category.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { categoryUrl } from '@/entities/category/domain/entity/baseUrl'

/**
 * `CategoryGetAllService`
 * @class
 * @implements {CategoryGetAllRepository}
 * @description Implementación concreta del repositorio `CategoryGetAllRepository` para obtener todas las categorías.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class CategoryGetAllService implements CategoryGetAllRepository {
	/**
	 * Obtiene todas las categorías, opcionalmente filtradas por parámetros de consulta.
	 * @param {string} queryParams - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<CategoryDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene las categorías.
	 */ async getAll(queryParams: string): Promise<Response<CategoryDto>> {
		return await fetching({ url: `${categoryUrl}?${queryParams}`, method: 'GET' })
	}
}
