import { fetching } from '@/shared/api/api'
import { type UnidadGetAllRepository } from '../../domain/repository/UnidadGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { type UnidadDto } from '../../domain/dto/Unidad.dto'
import { unidadUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the UnidadGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all Unidad data from the API, optionally with query parameters.
 */
export class UnidadGetAllService implements UnidadGetAllRepository {
	/**
	 * Retrieves all Unidads, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of UnidadDto.
	 */
	async getAll(queryParams: string): Promise<Response<UnidadDto>> {
		return await fetching({
			url: `${unidadUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
