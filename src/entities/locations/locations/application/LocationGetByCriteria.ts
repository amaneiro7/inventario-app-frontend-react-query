import { LocationGetAll } from './LocationGetAll'
import { LocationGetAllRepository } from '../domain/repository/LocationGetAllRepository'
import { createLocationParams, LocationFilters } from './CreateLocationQueryParams'

export class LocationGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'typeOfSiteId'
	private readonly getAll: LocationGetAll
	constructor(private readonly repository: LocationGetAllRepository) {
		this.getAll = new LocationGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = LocationGetByCriteria.defaultPageSize,
		orderType,
		orderBy,
		...options
	}: LocationFilters) {
		const queryParams = await createLocationParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
