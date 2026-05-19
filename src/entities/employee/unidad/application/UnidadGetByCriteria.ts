import { UnidadGetAll } from './UnidadGetAll'
import { createUnidadParams } from './createUnidadQueryParams'
import type { UnidadGetAllRepository } from '../domain/repository/UnidadGetAllRepository'
import type { UnidadFilters } from './createUnidadQueryParams'

/**
 * Service class for retrieving Unidad entities based on various criteria.
 * It utilizes `UnidadGetAll` for fetching and `createUnidadParams` to construct query parameters.
 */
export class UnidadGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'codigoInterno'
	private readonly getAll: UnidadGetAll

	/**
	 * Constructs a UnidadGetByCriteria instance.
	 * @param repository - The repository responsible for fetching Unidad data.
	 */
	constructor(private readonly repository: UnidadGetAllRepository) {
		this.getAll = new UnidadGetAll(this.repository)
	}

	/**
	 * Searches for Unidads based on the provided filters and pagination options.
	 * It constructs query parameters using `createUnidadParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (UnidadDto).
	 */
	async search({
		pageNumber = 1,
		pageSize = UnidadGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: UnidadFilters) {
		const queryParams = await createUnidadParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
