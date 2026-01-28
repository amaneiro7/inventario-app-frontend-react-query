import { fetching } from '@/shared/api/api'
import { type VicepresidenciaGetAllRepository } from '../../domain/repository/VicepresidenciaGetAllRepository'
import { type VicepresidenciaDto } from '../../domain/dto/Vicepresidencia.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { vicepresidenciaUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the VicepresidenciaGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all vicepresidencia data from the API, optionally with query parameters.
 */
export class VicepresidenciaGetAllService implements VicepresidenciaGetAllRepository {
	/**
	 * Retrieves all vicepresidencias, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of VicepresidenciaDto.
	 */
	async getAll(queryParams: string): Promise<Response<VicepresidenciaDto>> {
		return await fetching({
			url: `${vicepresidenciaUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
