import { HistoryGetAllRepository } from '../domain/repository/HistoryGetAllRepository'
import { HistoryGetAll } from './HistoryGetAll'
import { createHistoryParams, type HistoryFilters } from './createHistoryQueryParams'

export class HistoryGetByCriteria {
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
