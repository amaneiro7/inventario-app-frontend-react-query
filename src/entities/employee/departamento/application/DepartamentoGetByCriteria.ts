import { DepartamentoGetAll } from './DepartamentoGetAll'
import { type DepartamentoGetAllRepository } from '../domain/repository/DepartamentoGetAllRepository'
import { createDepartamentoParams, type DepartamentoFilters } from './createDepartamentoQueryParams'

export class DepartamentoGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: DepartamentoGetAll
	constructor(private readonly repository: DepartamentoGetAllRepository) {
		this.getAll = new DepartamentoGetAll(this.repository)
	}

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
