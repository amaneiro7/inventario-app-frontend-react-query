import { CityGetAllRepository } from '../domain/repository/CityGetAllRepository'
import { CityGetAll } from './CityGetAll'
import { createCityParams, type CityFilters } from './createCityQueryParams'

export class CityGetByCriteria {
	private readonly getAll: CityGetAll
	constructor(private readonly repository: CityGetAllRepository) {
		this.getAll = new CityGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: CityFilters) {
		const queryParams = await createCityParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
