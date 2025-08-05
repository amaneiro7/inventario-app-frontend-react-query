import { fetching } from '@/shared/api/api'
import { type MemoryRamTypeGetAllRepository } from '../../domain/repository/MemoryRamTypeGetAllRepository'
import { type MemoryRamTypeDto } from '../../domain/dto/MemoryRamType.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { memoryRamTypeUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the MemoryRamTypeGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all memory RAM type data from the API, optionally with query parameters.
 */
export class MemoryRamTypeGetAllService implements MemoryRamTypeGetAllRepository {
	/**
	 * Retrieves all memory RAM types, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of MemoryRamTypeDto.
	 */
	async getAll(queryParams: string): Promise<Response<MemoryRamTypeDto>> {
		return await fetching({
			url: `${memoryRamTypeUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}