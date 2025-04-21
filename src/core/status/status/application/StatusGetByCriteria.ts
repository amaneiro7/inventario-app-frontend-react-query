import { StatusGetAllRepository } from '../domain/repository/StatusGetAllRepository'
import { StatusGetAll } from './StatusGetAll'
import { createStatusParams, type StatusFilters } from './createStatusQueryParams'

export class StatusGetByCriteria {
	private readonly getAll: StatusGetAll
	constructor(private readonly repository: StatusGetAllRepository) {
		this.getAll = new StatusGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: StatusFilters) {
		const queryParams = await createStatusParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
