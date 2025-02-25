import { type HardDriveTypeGetAllRepository } from '../domain/repository/HardDriveTypeGetAllRepository'
import { HardDriveTypeGetAll } from './HardDriveTypeGetAll'
import {
	createHardDriveTypeParams,
	type HardDriveTypeFilters
} from './createHardDriveTypeQueryParams'

export class HardDriveTypeGetByCriteria {
	private readonly getAll: HardDriveTypeGetAll
	constructor(private readonly repository: HardDriveTypeGetAllRepository) {
		this.getAll = new HardDriveTypeGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: HardDriveTypeFilters) {
		const queryParams = await createHardDriveTypeParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
