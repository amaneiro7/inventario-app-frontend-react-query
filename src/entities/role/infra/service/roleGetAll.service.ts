import { fetching } from '@/shared/api/api'
import { roleUrl } from '../../domain/entity/baseUrl'
import { type RoleDto } from '../../domain/dto/Role.dto'
import { type RoleGetAllRepository } from '../../domain/repository/RoleGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'

/**
 * Implementation of the RoleGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all role data from the API, optionally with query parameters.
 */
export class RoleGetAllService implements RoleGetAllRepository {
	/**
	 * Retrieves all roles, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of RoleDto.
	 */
	async getAll(queryParams: string): Promise<Response<RoleDto>> {
		return await fetching({
			url: `${roleUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}