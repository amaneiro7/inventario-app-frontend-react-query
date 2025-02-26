import { SiteGetAllRepository } from '../domain/repository/SiteGetAllRepository'
import { SiteGetAll } from './SiteGetAll'
import { createSiteParams, type SiteFilters } from './createSiteQueryParams'

export class SiteGetByCriteria {
	private readonly getAll: SiteGetAll
	constructor(private readonly repository: SiteGetAllRepository) {
		this.getAll = new SiteGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: SiteFilters) {
		const queryParams = await createSiteParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
