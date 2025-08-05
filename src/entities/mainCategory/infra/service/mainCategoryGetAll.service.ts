import { fetching } from '@/shared/api/api'
import { type MainCategoryGetAllRepository } from '../../domain/repository/MainCategoryGetAllRepository'
import { type MainCategoryDto } from '../../domain/dto/MainCategory.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { mainCategoryUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the MainCategoryGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all main category data from the API, optionally with query parameters.
 */
export class MainCategoryGetAllService implements MainCategoryGetAllRepository {
	/**
	 * Retrieves all main categories, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of MainCategoryDto.
	 */
	async getAll(queryParams: string): Promise<Response<MainCategoryDto>> {
		return await fetching({
			url: `${mainCategoryUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}