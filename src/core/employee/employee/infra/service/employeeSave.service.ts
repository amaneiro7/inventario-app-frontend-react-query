import { fetching } from '@/api/api'
import { type EmployeeSaveRepository } from '../../domain/repository/EmployeeSaveRepository'
import { type EmployeeParams } from '../../domain/dto/Employee.dto'
import { employeeUrl } from '../../domain/entity/baseUrl'

export class EmployeeSaveService implements EmployeeSaveRepository {
	async save({ payload }: { payload: EmployeeParams }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: employeeUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: EmployeeParams
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${employeeUrl}/${id}`,
			data: payload
		})
	}
}
