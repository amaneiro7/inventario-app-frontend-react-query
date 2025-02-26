import { RoleGetAllRepository } from '../domain/repository/RoleGetAllRepository'
import { RoleGetAll } from './RoleGetAll'
import { createRoleParams, type RoleFilters } from './createRoleQueryParams'

export class RoleGetByCriteria {
	private readonly getAll: RoleGetAll
	constructor(private readonly repository: RoleGetAllRepository) {
		this.getAll = new RoleGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: RoleFilters) {
		const queryParams = await createRoleParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
