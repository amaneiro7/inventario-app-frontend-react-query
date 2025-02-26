import { MemoryRamTypeGetAllRepository } from '../domain/repository/MemoryRamTypeGetAllRepository'
import { MemoryRamTypeGetAll } from './MemoryRamTypeGetAll'
import {
	createMemoryRamTypeParams,
	type MemoryRamTypeFilters
} from './createMemoryRamTypeQueryParams'

export class MemoryRamTypeGetByCriteria {
	private readonly getAll: MemoryRamTypeGetAll
	constructor(private readonly repository: MemoryRamTypeGetAllRepository) {
		this.getAll = new MemoryRamTypeGetAll(this.repository)
	}

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
