import { MainCategoryGetAll } from './MainCategoryGetAll'
import { type MainCategoryGetAllRepository } from '../domain/repository/MainCategoryGetAllRepository'
import { createMainCategoryParams, type MainCategoryFilters } from './CreateMainCategoryQueryParams'

export class MainCategoryGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: MainCategoryGetAll
	constructor(private readonly repository: MainCategoryGetAllRepository) {
		this.getAll = new MainCategoryGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = MainCategoryGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: MainCategoryFilters) {
		const queryParams = await createMainCategoryParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
