import { EmployeeGetAllRepository } from '../domain/repository/EmployeeGetAllRepository'
import { EmployeeGetAll } from './EmployeeGetAll'
import { createEmployeeParams, type EmployeeFilters } from './createEmployeeQueryParams'

/**
 * Service class for retrieving Employee entities based on various criteria.
 * It utilizes `EmployeeGetAll` for fetching and `createEmployeeParams` to construct query parameters.
 */
export class EmployeeGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'userName'
	private readonly getAll: EmployeeGetAll

	/**
	 * Constructs an EmployeeGetByCriteria instance.
	 * @param repository - The repository responsible for fetching employee data.
	 */
	constructor(private readonly repository: EmployeeGetAllRepository) {
		this.getAll = new EmployeeGetAll(this.repository)
	}

	/**
	 * Searches for employees based on the provided filters and pagination options.
	 * It constructs query parameters using `createEmployeeParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (EmployeeDto).
	 */
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
