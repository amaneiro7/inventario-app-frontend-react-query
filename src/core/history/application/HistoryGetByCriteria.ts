import { HistoryGetAllRepository } from '../domain/repository/HistoryGetAllRepository'
import { HistoryGetAll } from './HistoryGetAll'
import { createHistoryParams, type HistoryFilters } from './createHistoryQueryParams'

export class HistoryGetByCriteria {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'updatedAt'
	private readonly getAll: HistoryGetAll
	constructor(private readonly repository: HistoryGetAllRepository) {
		this.getAll = new HistoryGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: HistoryFilters) {
		const queryParams = await createHistoryParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
