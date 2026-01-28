import { VicepresidenciaEjecutivaGetAll } from './VicepresidenciaEjecutivaGetAll'
import { type VicepresidenciaEjecutivaGetAllRepository } from '../domain/repository/VicepresidenciaEjecutivaGetAllRepository'
import {
	createVicepresidenciaEjecutivaParams,
	type VicepresidenciaEjecutivaFilters
} from './createVicepresidenciaEjecutivaQueryParams'

/**
 * Service class for retrieving VicepresidenciaEjecutiva entities based on various criteria.
 * It utilizes `VicepresidenciaEjecutivaGetAll` for fetching and `createVicepresidenciaEjecutivaParams` to construct query parameters.
 */
export class VicepresidenciaEjecutivaGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: VicepresidenciaEjecutivaGetAll

	/**
	 * Constructs a VicepresidenciaEjecutivaGetByCriteria instance.
	 * @param repository - The repository responsible for fetching vicepresidencia ejecutiva data.
	 */
	constructor(private readonly repository: VicepresidenciaEjecutivaGetAllRepository) {
		this.getAll = new VicepresidenciaEjecutivaGetAll(this.repository)
	}

	/**
	 * Searches for vicepresidencias ejecutivas based on the provided filters and pagination options.
	 * It constructs query parameters using `createVicepresidenciaEjecutivaParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (VicepresidenciaEjecutivaDto).
	 */
	async search({
		pageNumber = 1,
		pageSize = VicepresidenciaEjecutivaGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: VicepresidenciaEjecutivaFilters) {
		const queryParams = await createVicepresidenciaEjecutivaParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
