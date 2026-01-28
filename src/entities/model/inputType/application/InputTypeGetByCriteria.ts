import { InputTypeGetAllRepository } from '../domain/repository/InputTypeGetAllRepository'
import { InputTypeGetAll } from './InputTypeGetAll'
import { createInputTypeParams, type InputTypeFilters } from './createInputTypeQueryParams'

/**
 * Service class for retrieving InputType entities based on various criteria.
 * It utilizes `InputTypeGetAll` for fetching and `createInputTypeParams` to construct query parameters.
 */
export class InputTypeGetByCriteria {
	private readonly getAll: InputTypeGetAll

	/**
	 * Constructs an InputTypeGetByCriteria instance.
	 * @param repository - The repository responsible for fetching input type data.
	 */
	constructor(private readonly repository: InputTypeGetAllRepository) {
		this.getAll = new InputTypeGetAll(this.repository)
	}

	/**
	 * Searches for input types based on the provided filters and pagination options.
	 * It constructs query parameters using `createInputTypeParams` and then executes the search
	 * using the `getAll` service.
	 * @param filters - An object containing various filter criteria and pagination parameters.
	 * @returns A Promise that resolves to the search results (InputTypeDto).
	 */
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
