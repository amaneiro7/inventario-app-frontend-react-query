import { DepartamentoGetAll } from './DepartamentoGetAll'
import { type DepartamentoGetAllRepository } from '../domain/repository/DepartamentoGetAllRepository'
import { createDepartamentoParams, type DepartamentoFilters } from './createDepartamentoQueryParams'

/**
 * Service class for retrieving Departamento entities based on various criteria.
 * It utilizes `DepartamentoGetAll` for fetching and `createDepartamentoParams` to construct query parameters.
 */
export class DepartamentoGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: DepartamentoGetAll

	/**
	 * Constructs a DepartamentoGetByCriteria instance.
	 * @param repository - The repository responsible for fetching departamento data.
	 */
	constructor(private readonly repository: DepartamentoGetAllRepository) {
		this.getAll = new DepartamentoGetAll(this.repository)
	}

	/**
	 * Searches for departamentos based on the provided filters and pagination options.
	 * It constructs query parameters using `createDepartamentoParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (DepartamentoDto).
	 */
	async search({
		pageNumber = 1,
		pageSize = DepartamentoGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: DepartamentoFilters) {
		const queryParams = await createDepartamentoParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
