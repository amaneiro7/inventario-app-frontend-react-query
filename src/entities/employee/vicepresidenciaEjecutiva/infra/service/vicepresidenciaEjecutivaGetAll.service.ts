import { fetching } from '@/shared/api/api'
import { type VicepresidenciaEjecutivaGetAllRepository } from '../../domain/repository/VicepresidenciaEjecutivaGetAllRepository'
import { type VicepresidenciaEjecutivaDto } from '../../domain/dto/VicepresidenciaEjecutiva.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { vicepresidenciaEjecutivaUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the VicepresidenciaEjecutivaGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all executive vicepresidencia data from the API, optionally with query parameters.
 */
export class VicepresidenciaEjecutivaGetAllService
	implements VicepresidenciaEjecutivaGetAllRepository
{
	/**
	 * Retrieves all executive vicepresidencias, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of VicepresidenciaEjecutivaDto.
	 */
	async getAll(queryParams: string): Promise<Response<VicepresidenciaEjecutivaDto>> {
		return await fetching({
			url: `${vicepresidenciaEjecutivaUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}