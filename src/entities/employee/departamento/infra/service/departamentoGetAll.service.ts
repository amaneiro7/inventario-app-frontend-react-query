import { fetching } from '@/shared/api/api'
import { type DepartamentoGetAllRepository } from '../../domain/repository/DepartamentoGetAllRepository'
import { type DepartamentoDto } from '../../domain/dto/Departamento.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { departamentoUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the DepartamentoGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all departamento data from the API, optionally with query parameters.
 */
export class DepartamentoGetAllService implements DepartamentoGetAllRepository {
	/**
	 * Retrieves all departamentos, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of DepartamentoDto.
	 */
	async getAll(queryParams: string): Promise<Response<DepartamentoDto>> {
		return await fetching({
			url: `${departamentoUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}