import { StatusGetAllRepository } from '../domain/repository/StatusGetAllRepository'
import { StatusGetAll } from './StatusGetAll'
import { createStatusParams, type StatusFilters } from './createStatusQueryParams'

/**
 * Service class for retrieving Status entities based on various criteria.
 * It utilizes `StatusGetAll` for fetching and `createStatusParams` to construct query parameters.
 */
export class StatusGetByCriteria {
	private readonly getAll: StatusGetAll

	/**
	 * Constructs a StatusGetByCriteria instance.
	 * @param repository - The repository responsible for fetching status data.
	 */
	constructor(private readonly repository: StatusGetAllRepository) {
		this.getAll = new StatusGetAll(this.repository)
	}

	/**
	 * Searches for statuses based on the provided filters and pagination options.
	 * It constructs query parameters using `createStatusParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (StatusDto).
	 */
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
