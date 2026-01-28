import { fetching } from '@/shared/api/api'
import { type CargoGetAllRepository } from '../../domain/repository/CargoGetAllRepository'
import { type CargoDto } from '../../domain/dto/Cargo.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { cargoUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the CargoGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all cargo data from the API, optionally with query parameters.
 */
export class CargoGetAllService implements CargoGetAllRepository {
	/**
	 * Retrieves all cargos, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of CargoDto.
	 */
	async getAll(queryParams: string): Promise<Response<CargoDto>> {
		return await fetching({
			url: `${cargoUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
