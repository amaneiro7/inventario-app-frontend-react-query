import { MainCategoryGetAll } from './MainCategoryGetAll'
import { type MainCategoryGetAllRepository } from '../domain/repository/MainCategoryGetAllRepository'
import { createMainCategoryParams, type MainCategoryFilters } from './CreateMainCategoryQueryParams'

/**
 * Service class for retrieving MainCategory entities based on various criteria.
 * It utilizes `MainCategoryGetAll` for fetching and `createMainCategoryParams` to construct query parameters.
 */
export class MainCategoryGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: MainCategoryGetAll

	/**
	 * Constructs a MainCategoryGetByCriteria instance.
	 * @param repository - The repository responsible for fetching main category data.
	 */
	constructor(private readonly repository: MainCategoryGetAllRepository) {
		this.getAll = new MainCategoryGetAll(this.repository)
	}

	/**
	 * Searches for main categories based on the provided filters and pagination options.
	 * It constructs query parameters using `createMainCategoryParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (MainCategoryDto).
	 */
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
