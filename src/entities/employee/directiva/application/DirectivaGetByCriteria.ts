import { DirectivaGetAll } from './DirectivaGetAll'
import { type DirectivaGetAllRepository } from '../domain/repository/DirectivaGetAllRepository'
import { createDirectivaParams, type DirectivaFilters } from './createDirectivaQueryParams'

/**
 * Service class for retrieving Directiva entities based on various criteria.
 * It utilizes `DirectivaGetAll` for fetching and `createDirectivaParams` to construct query parameters.
 */
export class DirectivaGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: DirectivaGetAll

	/**
	 * Constructs a DirectivaGetByCriteria instance.
	 * @param repository - The repository responsible for fetching directiva data.
	 */
	constructor(private readonly repository: DirectivaGetAllRepository) {
		this.getAll = new DirectivaGetAll(this.repository)
	}

	/**
	 * Searches for directivas based on the provided filters and pagination options.
	 * It constructs query parameters using `createDirectivaParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (DirectivaDto).
	 */
	async search({
		pageNumber = 1,
		pageSize = DirectivaGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: DirectivaFilters) {
		const queryParams = await createDirectivaParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}