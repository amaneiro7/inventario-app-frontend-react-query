import { CentroCostoGetAll } from './CentroCostoGetAll'
import { type CentroCostoGetAllRepository } from '../domain/repository/CentroCostoGetAllRepository'
import { createCentroCostoParams, type CentroCostoFilters } from './createCentroCostoQueryParams'

export class CentroCostoGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: CentroCostoGetAll
	constructor(private readonly repository: CentroCostoGetAllRepository) {
		this.getAll = new CentroCostoGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = CentroCostoGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: CentroCostoFilters) {
		const queryParams = await createCentroCostoParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
