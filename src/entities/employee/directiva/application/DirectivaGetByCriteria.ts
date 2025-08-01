import { DirectivaGetAll } from './DirectivaGetAll'
import { type DirectivaGetAllRepository } from '../domain/repository/DirectivaGetAllRepository'
import { createDirectivaParams, type DirectivaFilters } from './createDirectivaQueryParams'

export class DirectivaGetByCriteria {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: DirectivaGetAll
	constructor(private readonly repository: DirectivaGetAllRepository) {
		this.getAll = new DirectivaGetAll(this.repository)
	}

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
