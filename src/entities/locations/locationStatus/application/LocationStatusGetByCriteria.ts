import { LocationStatusGetAllRepository } from '../domain/repository/LocationStatusGetAllRepository'
import { LocationStatusGetAll } from './LocationStatusGetAll'
import {
	createLocationStatusParams,
	type LocationStatusFilters
} from './createLocationStatusQueryParams'

export class LocationStatusGetByCriteria {
	private readonly getAll: LocationStatusGetAll
	constructor(private readonly repository: LocationStatusGetAllRepository) {
		this.getAll = new LocationStatusGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: LocationStatusFilters) {
		const queryParams = await createLocationStatusParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
