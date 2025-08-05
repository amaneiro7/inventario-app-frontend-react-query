import { RoleGetAllRepository } from '../domain/repository/RoleGetAllRepository'
import { RoleGetAll } from './RoleGetAll'
import { createRoleParams, type RoleFilters } from './createRoleQueryParams'

/**
 * Service class for retrieving Role entities based on various criteria.
 * It utilizes `RoleGetAll` for fetching and `createRoleParams` to construct query parameters.
 */
export class RoleGetByCriteria {
	private readonly getAll: RoleGetAll

	/**
	 * Constructs a RoleGetByCriteria instance.
	 * @param repository - The repository responsible for fetching role data.
	 */
	constructor(private readonly repository: RoleGetAllRepository) {
		this.getAll = new RoleGetAll(this.repository)
	}

	/**
	 * Searches for roles based on the provided filters and pagination options.
	 * It constructs query parameters using `createRoleParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (RoleDto).
	 */
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