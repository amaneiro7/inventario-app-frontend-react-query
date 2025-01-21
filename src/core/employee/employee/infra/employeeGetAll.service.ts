import { fetching } from '@/api/api'
import { type EmployeeGetAllRepository } from '../domain/repository/EmployeeGetAllRepository'
import { type EmployeeDto } from '../domain/dto/Employee.dto'
import { employeeUrl } from '../domain/entity/baseUrl'

export class EmployeeGetAllService implements EmployeeGetAllRepository {
	async getAll(): Promise<EmployeeDto[]> {
		return await fetching<EmployeeDto[]>({
			url: employeeUrl,
			method: 'GET'
		})
	}
}
