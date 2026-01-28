import { fetching } from '@/shared/api/api'
import { type EmployeeSaveRepository } from '../../domain/repository/EmployeeSaveRepository'
import { type EmployeeParams } from '../../domain/dto/Employee.dto'
import { employeeUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the EmployeeSaveRepository interface using the fetching utility.
 * This service is responsible for saving (creating) and updating employee data via the API.
 */
export class EmployeeSaveService implements EmployeeSaveRepository {
	/**
	 * Saves a new employee record.
	 * @param params - An object containing the payload for the new employee.
	 * @param params.payload - The EmployeeParams object containing the employee data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async save({ payload }: { payload: EmployeeParams }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: employeeUrl,
			data: payload
		})
	}

	/**
	 * Updates an existing employee record.
	 * @param params - An object containing the ID of the employee to update and the payload.
	 * @param params.id - The ID of the employee to update.
	 * @param params.payload - The EmployeeParams object containing the updated employee data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
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
