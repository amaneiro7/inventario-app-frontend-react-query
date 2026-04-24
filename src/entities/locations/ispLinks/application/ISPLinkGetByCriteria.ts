import { ISPLinkGetAllRepository } from '../domain/repository/ISPLinkGetAllRepository'
import { ISPLinkGetAll } from './ISPLinkGetAll'
import { createISPLinkParams, type ISPLinkFilters } from './createISPLinkQueryParams'

export class ISPLinkGetByCriteria {
	private readonly getAll: ISPLinkGetAll
	constructor(private readonly repository: ISPLinkGetAllRepository) {
		this.getAll = new ISPLinkGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: ISPLinkFilters) {
		const queryParams = await createISPLinkParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
