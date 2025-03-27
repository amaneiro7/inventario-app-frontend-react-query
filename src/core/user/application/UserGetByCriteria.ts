import { UserGetAllRepository } from '../domain/repository/UserGetAllRepository'
import { UserGetAll } from './UserGetAll'
import { createUserParams, type UserFilters } from './createUserQueryParams'

export class UserGetByCriteria {
	private readonly getAll: UserGetAll
	constructor(private readonly repository: UserGetAllRepository) {
		this.getAll = new UserGetAll(this.repository)
	}

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
