import { type LocationMonitoringGetAllRepository } from '../domain/repository/LocationMonitoringGetAllRepository'
import {
	createLocationMonitoringParams,
	type LocationMonitoringFilters
} from './createLocationMonitoringQueryParams'
import { LocationMonitoringGetAll } from './LocationMonitoringGetAll'

export class LocationMonitoringGetByCriteria {
	static readonly pageSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	private readonly getAll: LocationMonitoringGetAll
	constructor(private readonly repository: LocationMonitoringGetAllRepository) {
		this.getAll = new LocationMonitoringGetAll(this.repository)
	}

	async search(query: LocationMonitoringFilters) {
		const queryParams = await createLocationMonitoringParams(query)

		return await this.getAll.execute(queryParams)
	}
}
