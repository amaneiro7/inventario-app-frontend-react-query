import { VicepresidenciaGetAll } from './VicepresidenciaGetAll'
import { type VicepresidenciaGetAllRepository } from '../domain/repository/VicepresidenciaGetAllRepository'
import {
	createVicepresidenciaParams,
	type VicepresidenciaFilters
} from './createVicepresidenciaQueryParams'

export class VicepresidenciaGetByCriteria {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: VicepresidenciaGetAll
	constructor(private readonly repository: VicepresidenciaGetAllRepository) {
		this.getAll = new VicepresidenciaGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = VicepresidenciaGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: VicepresidenciaFilters) {
		const queryParams = await createVicepresidenciaParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
