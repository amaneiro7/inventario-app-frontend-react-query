import { fetching } from '@/shared/api/api'
import { type EmployeeGetAllRepository } from '../../domain/repository/EmployeeGetAllRepository'
import { type EmployeeDto } from '../../domain/dto/Employee.dto'
import { employeeUrl } from '../../domain/entity/baseUrl'
import { Response } from '@/entities/shared/domain/methods/Response'

/**
 * Implementation of the EmployeeGetAllRepository interface using the fetching utility.
 * This service is responsible for retrieving all employee data from the API, optionally with query parameters.
 */
export class EmployeeGetAllService implements EmployeeGetAllRepository {
	/**
	 * Retrieves all employees, optionally filtered by query parameters.
	 * @param queryParams - A string containing URL query parameters for filtering and pagination.
	 * @returns A Promise that resolves to a Response object containing an array of EmployeeDto.
	 */
	async getAll(queryParams: string): Promise<Response<EmployeeDto>> {
		return await fetching({
			url: `${employeeUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
