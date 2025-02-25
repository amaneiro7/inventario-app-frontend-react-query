import { HardDriveCapacityGetAll } from './HardDriveCapacityGetAll'
import {
	createHardDriveCapacityParams,
	type HardDriveCapacityFilters
} from './createHardDriveCapacityQueryParams'
import { type HardDriveCapacityGetAllRepository } from '../domain/repository/HardDriveCapacityGetAllRepository'

export class HardDriveCapacityGetByCriteria {
	private readonly getAll: HardDriveCapacityGetAll
	constructor(private readonly repository: HardDriveCapacityGetAllRepository) {
		this.getAll = new HardDriveCapacityGetAll(this.repository)
	}

	async search({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...options
	}: HardDriveCapacityFilters) {
		const queryParams = await createHardDriveCapacityParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
