import { fetching } from '@/shared/api/api'
import { type HistoryGetAllRepository } from '../../domain/repository/HistoryGetAllRepository'
import { type HistoryDto } from '../../domain/dto/History.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { historyUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the HistoryGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all history data from the API, optionally with query parameters.
 */
export class HistoryGetAllService implements HistoryGetAllRepository {
	/**
	 * Retrieves all history records, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of HistoryDto.
	 */
	async getAll(queryParams: string): Promise<Response<HistoryDto>> {
		return await fetching({
			url: `${historyUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}