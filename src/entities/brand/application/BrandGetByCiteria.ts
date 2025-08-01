import { BrandGetAll } from './BrandGetAll'
import { type BrandFilters, createBrandParams } from './createBrandQueryParams'
import { type BrandGetAllRepository } from '../domain/repository/BrandGetAllRepository'

export class BrandGetByCriteria {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: BrandGetAll
	constructor(private readonly repository: BrandGetAllRepository) {
		this.getAll = new BrandGetAll(this.repository)
	}

	async search({
		pageNumber,
		pageSize,
		orderBy = BrandGetByCriteria.defaultOrderBy,
		orderType,
		...options
	}: BrandFilters) {
		const queryParams = await createBrandParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
