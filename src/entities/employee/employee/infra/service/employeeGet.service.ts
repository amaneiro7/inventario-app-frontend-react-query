import { fetching } from '@/shared/api/api'
import { employeeUrl } from '../../domain/entity/baseUrl'
import { type EmployeeGetRepository } from '../../domain/repository/EmployeeGetRepository'
import { type EmployeeDto } from '../../domain/dto/Employee.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type EmployeeId } from '../../domain/value-object/EmployeeId'

/**
 * Implementation of the EmployeeGetRepository interface using the fetching utility.
 * This service is responsible for retrieving employee data from the API.
 */
export class EmployeeGetService implements EmployeeGetRepository {
	/**
	 * Retrieves an employee by their ID.
	 * @param params - An object containing the ID of the employee to retrieve.
	 * @param params.id - The primitive value of the EmployeeId.
	 * @returns A Promise that resolves to the EmployeeDto.
	 */
	async getById({ id }: { id: Primitives<EmployeeId> }): Promise<EmployeeDto> {
		return await fetching<EmployeeDto>({
			url: `${employeeUrl}/${id}`,
			method: 'GET'
		})
	}
}