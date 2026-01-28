import { MemoryRamTypeGetAllRepository } from '../domain/repository/MemoryRamTypeGetAllRepository'
import { MemoryRamTypeGetAll } from './MemoryRamTypeGetAll'
import {
	createMemoryRamTypeParams,
	type MemoryRamTypeFilters
} from './createMemoryRamTypeQueryParams'

/**
 * Service class for retrieving MemoryRamType entities based on various criteria.
 * It utilizes `MemoryRamTypeGetAll` for fetching and `createMemoryRamTypeParams` to construct query parameters.
 */
export class MemoryRamTypeGetByCriteria {
	private readonly getAll: MemoryRamTypeGetAll

	/**
	 * Constructs a MemoryRamTypeGetByCriteria instance.
	 * @param repository - The repository responsible for fetching memory RAM type data.
	 */
	constructor(private readonly repository: MemoryRamTypeGetAllRepository) {
		this.getAll = new MemoryRamTypeGetAll(this.repository)
	}

	/**
	 * Searches for memory RAM types based on the provided filters and pagination options.
	 * It constructs query parameters using `createMemoryRamTypeParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (MemoryRamTypeDto).
	 */
	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: MemoryRamTypeFilters) {
		const queryParams = await createMemoryRamTypeParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
