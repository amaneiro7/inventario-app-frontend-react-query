import { RegionGetAllRepository } from '../domain/repository/RegionGetAllRepository'
import { RegionGetAll } from './RegionGetAll'
import { createRegionParams, type RegionFilters } from './createRegionQueryParams'

export class RegionGetByCriteria {
	private readonly getAll: RegionGetAll
	constructor(private readonly repository: RegionGetAllRepository) {
		this.getAll = new RegionGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: RegionFilters) {
		const queryParams = await createRegionParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
