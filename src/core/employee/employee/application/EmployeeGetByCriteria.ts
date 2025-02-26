import { EmployeeGetAllRepository } from '../domain/repository/EmployeeGetAllRepository'
import { EmployeeGetAll } from './EmployeeGetAll'
import { createEmployeeParams, type EmployeeFilters } from './createEmployeeQueryParams'

export class EmployeeGetByCriteria {
	private readonly getAll: EmployeeGetAll
	constructor(private readonly repository: EmployeeGetAllRepository) {
		this.getAll = new EmployeeGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: EmployeeFilters) {
		const queryParams = await createEmployeeParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
