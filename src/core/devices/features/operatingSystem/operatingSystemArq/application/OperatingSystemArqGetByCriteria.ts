import { type OperatingSystemArqGetAllRepository } from '../domain/repository/OperatingSystemArqGetAllRepository'
import { OperatingSystemArqGetAll } from './OperatingSystemArqGetAll'
import {
	createOperatingSystemArqParams,
	type OperatingSystemArqFilters
} from './createOperatingSystemArqQueryParams'
export class OperatingSystemArqGetByCriteria {
	private readonly getAll: OperatingSystemArqGetAll
	constructor(private readonly repository: OperatingSystemArqGetAllRepository) {
		this.getAll = new OperatingSystemArqGetAll(this.repository)
	}

	async search({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...options
	}: OperatingSystemArqFilters) {
		const queryParams = await createOperatingSystemArqParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
