import { fetching } from '@/shared/api/api'
import { type InputTypeDto } from '../../domain/dto/InputType.dto'
import { type InputTypeGetAllRepository } from '../../domain/repository/InputTypeGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { inputTypeUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the InputTypeGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all input type data from the API, optionally with query parameters.
 */
export class InputTypeGetAllService implements InputTypeGetAllRepository {
	/**
	 * Retrieves all input types, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of InputTypeDto.
	 */
	async getAll(queryParams: string): Promise<Response<InputTypeDto>> {
		return await fetching({
			url: `${inputTypeUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}