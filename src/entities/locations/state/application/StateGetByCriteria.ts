import { StateGetAllRepository } from '../domain/repository/StateGetAllRepository'
import { StateGetAll } from './StateGetAll'
import { createStateParams, type StateFilters } from './createStateQueryParams'

export class StateGetByCriteria {
	private readonly getAll: StateGetAll
	constructor(private readonly repository: StateGetAllRepository) {
		this.getAll = new StateGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: StateFilters) {
		const queryParams = await createStateParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
