import { UserGetAllRepository } from '../domain/repository/UserGetAllRepository'
import { UserGetAll } from './UserGetAll'
import { createUserParams, type UserFilters } from './createUserQueryParams'

/**
 * Service class for retrieving User entities based on various criteria.
 * It utilizes `UserGetAll` for fetching and `createUserParams` to construct query parameters.
 */
export class UserGetByCriteria {
	private readonly getAll: UserGetAll

	/**
	 * Constructs a UserGetByCriteria instance.
	 * @param repository - The repository responsible for fetching user data.
	 */
	constructor(private readonly repository: UserGetAllRepository) {
		this.getAll = new UserGetAll(this.repository)
	}

	/**
	 * Searches for users based on the provided filters and pagination options.
	 * It constructs query parameters using `createUserParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (LoginUserDto).
	 */
	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: UserFilters) {
		const queryParams = await createUserParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}