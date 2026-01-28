import { fetching } from '@/shared/api/api'
import { type DirectivaGetAllRepository } from '../../domain/repository/DirectivaGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { type DirectivaDto } from '../../domain/dto/Directiva.dto'
import { directivaUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the DirectivaGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all directiva data from the API, optionally with query parameters.
 */
export class DirectivaGetAllService implements DirectivaGetAllRepository {
	/**
	 * Retrieves all directivas, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of DirectivaDto.
	 */
	async getAll(queryParams: string): Promise<Response<DirectivaDto>> {
		return await fetching({
			url: `${directivaUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
