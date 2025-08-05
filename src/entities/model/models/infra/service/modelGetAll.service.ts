import { fetching } from '@/shared/api/api'
import { type ModelGetAllRepository } from '../../domain/repository/ModelGetAllRepository'
import { type ModelDto } from '../../domain/dto/Model.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { modelUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the ModelGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all model data from the API, optionally with query parameters.
 */
export class ModelGetAllService implements ModelGetAllRepository {
	/**
	 * Retrieves all models, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of ModelDto.
	 */
	async getAll(queryParams: string): Promise<Response<ModelDto>> {
		return await fetching({
			url: `${modelUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}