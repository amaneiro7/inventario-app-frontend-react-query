import { fetching } from '@/shared/api/api'
import { type BrandGetAllRepository } from '../../domain/repository/BrandGetAllRepository'
import { type BrandDto } from '../../domain/dto/Brand.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { brandUrl } from '../../domain/entity/baseUrl'

/**
 * `BrandGetAllService`
 * @class
 * @implements {BrandGetAllRepository}
 * @description Implementación concreta del repositorio `BrandGetAllRepository` para obtener todas las marcas.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class BrandGetAllService implements BrandGetAllRepository {
	/**
	 * Obtiene todas las marcas, opcionalmente filtradas por parámetros de consulta.
	 * @param {string} [queryParams] - Cadena de parámetros de consulta para filtrar los resultados.
	 * @returns {Promise<Response<BrandDto>>} Una promesa que se resuelve con un objeto de respuesta que contiene las marcas.
	 */	async getAll(queryParams?: string): Promise<Response<BrandDto>> {
		return await fetching({ url: `${brandUrl}?${queryParams}`, method: 'GET' })
	}
}