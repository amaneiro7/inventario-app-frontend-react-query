import { fetching } from '@/shared/api/api'
import { brandUrl } from '../../domain/entity/baseUrl'
import { type BrandGetRepository } from '../../domain/repository/BrandGetRepository'
import { type BrandDto } from '../../domain/dto/Brand.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type BrandId } from '../../domain/value-object/BrandId'

/**
 * `BrandGetService`
 * @class
 * @implements {BrandGetRepository}
 * @description Implementación concreta del repositorio `BrandGetRepository` para obtener una marca.
 * Utiliza la función `fetching` para realizar la petición HTTP a la API.
 */
export class BrandGetService implements BrandGetRepository {
	/**
	 * Obtiene una marca por su ID.
	 * @param {{ id: Primitives<BrandId> }} props - Objeto que contiene el ID de la marca.
	 * @returns {Promise<BrandDto>} Una promesa que se resuelve con el DTO de la marca encontrada.
	 */	async getById({ id }: { id: Primitives<BrandId> }): Promise<BrandDto> {
		return await fetching<BrandDto>({
			url: `${brandUrl}/${id}`,
			method: 'GET'
		})
	}
}