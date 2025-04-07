import { AdministrativeRegionGetAllRepository } from '../domain/repository/AdministrativeRegionGetAllRepository'
import { AdministrativeRegionGetAll } from './AdministrativeRegionGetAll'
import {
	createAdministrativeRegionParams,
	type AdministrativeRegionFilters
} from './createAdministrativeRegionQueryParams'

export class AdministrativeRegionGetByCriteria {
	private readonly getAll: AdministrativeRegionGetAll
	constructor(private readonly repository: AdministrativeRegionGetAllRepository) {
		this.getAll = new AdministrativeRegionGetAll(this.repository)
	}

	async search({
		pageNumber,
		pageSize,
		orderBy,
		orderType,
		...options
	}: AdministrativeRegionFilters) {
		const queryParams = await createAdministrativeRegionParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
