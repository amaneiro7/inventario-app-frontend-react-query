import { InputTypeGetAllRepository } from '../domain/repository/InputTypeGetAllRepository'
import { InputTypeGetAll } from './InputTypeGetAll'
import { createInputTypeParams, type InputTypeFilters } from './createInputTypeQueryParams'

export class InputTypeGetByCriteria {
	private readonly getAll: InputTypeGetAll
	constructor(private readonly repository: InputTypeGetAllRepository) {
		this.getAll = new InputTypeGetAll(this.repository)
	}

	async search({ pageNumber, pageSize, orderBy, orderType, ...options }: InputTypeFilters) {
		const queryParams = await createInputTypeParams({
			...options,
			pageNumber,
			pageSize,
			orderBy,
			orderType
		})

		return await this.getAll.execute(queryParams)
	}
}
