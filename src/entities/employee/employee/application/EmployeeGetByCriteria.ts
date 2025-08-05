import { EmployeeGetAllRepository } from '../domain/repository/EmployeeGetAllRepository'
import { EmployeeGetAll } from './EmployeeGetAll'
import { createEmployeeParams, type EmployeeFilters } from './createEmployeeQueryParams'

export class EmployeeGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'userName'
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
