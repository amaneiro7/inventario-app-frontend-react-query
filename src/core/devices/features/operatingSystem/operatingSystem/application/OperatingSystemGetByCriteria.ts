import { OperatingSystemGetAll } from './OperatingSystemGetAll'
import { type OperatingSystemGetAllRepository } from '../domain/repository/OperatingSystemGetAllRepository'
import {
	createOperatingSystemParams,
	type OperatingSystemFilters
} from './createOperatingSystemQueryParams'

export class OperatingSystemGetByCriteria {
	private readonly getAll: OperatingSystemGetAll
	constructor(private readonly repository: OperatingSystemGetAllRepository) {
		this.getAll = new OperatingSystemGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: OperatingSystemFilters) {
		const queryParams = await createOperatingSystemParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
