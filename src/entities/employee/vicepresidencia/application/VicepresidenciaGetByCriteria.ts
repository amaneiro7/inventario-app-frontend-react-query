import { VicepresidenciaGetAll } from './VicepresidenciaGetAll'
import { type VicepresidenciaGetAllRepository } from '../domain/repository/VicepresidenciaGetAllRepository'
import {
	createVicepresidenciaParams,
	type VicepresidenciaFilters
} from './createVicepresidenciaQueryParams'

/**
 * Service class for retrieving Vicepresidencia entities based on various criteria.
 * It utilizes `VicepresidenciaGetAll` for fetching and `createVicepresidenciaParams` to construct query parameters.
 */
export class VicepresidenciaGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: VicepresidenciaGetAll

	/**
	 * Constructs a VicepresidenciaGetByCriteria instance.
	 * @param repository - The repository responsible for fetching vicepresidencia data.
	 */
	constructor(private readonly repository: VicepresidenciaGetAllRepository) {
		this.getAll = new VicepresidenciaGetAll(this.repository)
	}

	/**
	 * Searches for vicepresidencias based on the provided filters and pagination options.
	 * It constructs query parameters using `createVicepresidenciaParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (VicepresidenciaDto).
	 */
	async search({
		pageNumber = 1,
		pageSize = VicepresidenciaGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: VicepresidenciaFilters) {
		const queryParams = await createVicepresidenciaParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
