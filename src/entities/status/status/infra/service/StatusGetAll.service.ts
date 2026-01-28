import { fetching } from '@/shared/api/api'
import { type StatusDto } from '../../domain/dto/Status.dto'
import { type StatusGetAllRepository } from '../../domain/repository/StatusGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { statusUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the StatusGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all status data from the API, optionally with query parameters.
 */
export class StatusGetAllService implements StatusGetAllRepository {
	/**
	 * Retrieves all statuses, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of StatusDto.
	 */
	async getAll(queryParams: string): Promise<Response<StatusDto>> {
		return await fetching({
			url: `${statusUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
