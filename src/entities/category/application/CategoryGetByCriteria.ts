import { CategoryGetAll } from './CategoryGetAll'
import { type CategoryGetAllRepository } from '../domain/repository/CategoryGetAllRepository'
import { createCategoryParams, type CategoryFilters } from './CreateCategoryQueryParams'

export class CategoryGetByCriteria {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: CategoryGetAll
	constructor(private readonly repository: CategoryGetAllRepository) {
		this.getAll = new CategoryGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = CategoryGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: CategoryFilters) {
		const queryParams = await createCategoryParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
