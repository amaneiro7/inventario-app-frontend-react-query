import { VicepresidenciaEjecutivaGetAll } from './VicepresidenciaEjecutivaGetAll'
import { type VicepresidenciaEjecutivaGetAllRepository } from '../domain/repository/VicepresidenciaEjecutivaGetAllRepository'
import {
	createVicepresidenciaEjecutivaParams,
	type VicepresidenciaEjecutivaFilters
} from './createVicepresidenciaEjecutivaQueryParams'

export class VicepresidenciaEjecutivaGetByCriteria {
	static readonly pegaSizeOptions = [10, 25, 50, 100]
	static readonly defaultPageSize = 25
	static readonly defaultOrderBy = 'name'
	private readonly getAll: VicepresidenciaEjecutivaGetAll
	constructor(private readonly repository: VicepresidenciaEjecutivaGetAllRepository) {
		this.getAll = new VicepresidenciaEjecutivaGetAll(this.repository)
	}

	async search({
		pageNumber = 1,
		pageSize = VicepresidenciaEjecutivaGetByCriteria.defaultPageSize,
		orderBy,
		orderType,
		...options
	}: VicepresidenciaEjecutivaFilters) {
		const queryParams = await createVicepresidenciaEjecutivaParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
