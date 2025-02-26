import { type ProcessorGetAllRepository } from '../domain/repository/ProcessorGetAllRepository'
import { ProcessorGetAll } from './ProcessorGetAll'
import { createProcessorParams, type ProcessorFilters } from './createProcessorQueryParams'

export class ProcessorGetByCriteria {
	private readonly getAll: ProcessorGetAll
	constructor(private readonly repository: ProcessorGetAllRepository) {
		this.getAll = new ProcessorGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: ProcessorFilters) {
		const queryParams = await createProcessorParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
