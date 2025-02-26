import { fetching } from '@/api/api'
import { employeeUrl } from '../../domain/entity/baseUrl'
import { type EmployeeGetRepository } from '../../domain/repository/EmployeeGetRepository'
import { type EmployeeDto } from '../../domain/dto/Employee.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type EmployeeId } from '../../domain/value-object/EmployeeId'

export class EmployeeGetService implements EmployeeGetRepository {
	async getById({ id }: { id: Primitives<EmployeeId> }): Promise<EmployeeDto> {
		return await fetching<EmployeeDto>({
			url: `${employeeUrl}/${id}`,
			method: 'GET'
		})
	}
}
