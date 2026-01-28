import { CargoGetAll } from './CargoGetAll'
import { type CargoGetAllRepository } from '../domain/repository/CargoGetAllRepository'
import { createCargoParams, type CargoFilters } from './createCargoQueryParams'

/**
 * Service class for retrieving Cargo entities based on various criteria.
 * It utilizes `CargoGetAll` for fetching and `createCargoParams` to construct query parameters.
 */
export class CargoGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: CargoGetAll

	/**
	 * Constructs a CargoGetByCriteria instance.
	 * @param repository - The repository responsible for fetching cargo data.
	 */
	constructor(private readonly repository: CargoGetAllRepository) {
		this.getAll = new CargoGetAll(this.repository)
	}

	/**
	 * Searches for cargos based on the provided filters and pagination options.
	 * It constructs query parameters using `createCargoParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (CargoDto).
	 */
	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: CargoFilters) {
		const queryParams = await createCargoParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
