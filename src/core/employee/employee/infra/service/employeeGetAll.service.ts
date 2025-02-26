import { fetching } from '@/api/api'
import { type EmployeeGetAllRepository } from '../../domain/repository/EmployeeGetAllRepository'
import { type EmployeeDto } from '../../domain/dto/Employee.dto'
import { employeeUrl } from '../../domain/entity/baseUrl'
import { Response } from '@/core/shared/domain/methods/Response'

export class EmployeeGetAllService implements EmployeeGetAllRepository {
	async getAll(queryParams: string): Promise<Response<EmployeeDto>> {
		return await fetching({
			url: `${employeeUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
