import { ModelGetAll } from './ModelGetAll'
import { type ModelGetAllRepository } from '../domain/repository/ModelGetAllRepository'
import { type ModelFilters, createModelParams } from './CreateModelsQueryParams'

export class ModelGetByCriteria {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'categoryId'
	private readonly getAll: ModelGetAll
	constructor(private readonly repository: ModelGetAllRepository) {
		this.getAll = new ModelGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = ModelGetByCriteria.defaultPageSize,
		orderBy = ModelGetByCriteria.defaultOrderBy,
		orderType,
		...options
	}: ModelFilters) {
		console.log('modelscriteria', options)
		const queryParams = await createModelParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
