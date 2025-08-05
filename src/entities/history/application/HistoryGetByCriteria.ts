import { OrderTypes } from '@/entities/shared/domain/criteria/OrderType'
import { HistoryGetAllRepository } from '../domain/repository/HistoryGetAllRepository'
import { HistoryGetAll } from './HistoryGetAll'
import { createHistoryParams, type HistoryFilters } from './createHistoryQueryParams'

/**
 * Service class for retrieving History entities based on various criteria.
 * It utilizes `HistoryGetAll` for fetching and `createHistoryParams` to construct query parameters.
 */
export class HistoryGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'updatedAt'
	static readonly defaultOrderType = OrderTypes.DESC
	private readonly getAll: HistoryGetAll

	/**
	 * Constructs a HistoryGetByCriteria instance.
	 * @param repository - The repository responsible for fetching history data.
	 */
	constructor(private readonly repository: HistoryGetAllRepository) {
		this.getAll = new HistoryGetAll(this.repository)
	}

	/**
	 * Searches for history records based on the provided filters and pagination options.
	 * It constructs query parameters using `createHistoryParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (HistoryDto).
	 */
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