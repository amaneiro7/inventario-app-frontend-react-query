import { TypeOfSiteGetAllRepository } from '../domain/repository/TypeOfSiteGetAllRepository'
import { TypeOfSiteGetAll } from './TypeOfSiteGetAll'
import { createTypeOfSiteParams, type TypeOfSiteFilters } from './createTypeOfSiteQueryParams'

export class TypeOfSiteGetByCriteria {
	private readonly getAll: TypeOfSiteGetAll
	constructor(private readonly repository: TypeOfSiteGetAllRepository) {
		this.getAll = new TypeOfSiteGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: TypeOfSiteFilters) {
		const queryParams = await createTypeOfSiteParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
