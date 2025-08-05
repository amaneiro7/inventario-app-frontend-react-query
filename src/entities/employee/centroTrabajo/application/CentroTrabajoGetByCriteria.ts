import { CentroTrabajoGetAll } from './CentroTrabajoGetAll'
import { type CentroTrabajoGetAllRepository } from '../domain/repository/CentroTrabajoGetAllRepository'
import {
	createCentroTrabajoParams,
	type CentroTrabajoFilters
} from './createCentroTrabajoQueryParams'

export class CentroTrabajoGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: CentroTrabajoGetAll
	constructor(private readonly repository: CentroTrabajoGetAllRepository) {
		this.getAll = new CentroTrabajoGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = CentroTrabajoGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: CentroTrabajoFilters) {
		const queryParams = await createCentroTrabajoParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
