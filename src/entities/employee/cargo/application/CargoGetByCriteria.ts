import { CargoGetAll } from './CargoGetAll'
import { type CargoGetAllRepository } from '../domain/repository/CargoGetAllRepository'
import { createCargoParams, type CargoFilters } from './createCargoQueryParams'

export class CargoGetByCriteria {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: CargoGetAll
	constructor(private readonly repository: CargoGetAllRepository) {
		this.getAll = new CargoGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: CargoFilters) {
		const queryParams = await createCargoParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
