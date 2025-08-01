import { type GetAllRepository } from '../repository/GetAllRepository.abstract'
import { type Response } from './Response'

export abstract class GetAllBaseService<T> {
	constructor(private readonly repository: GetAllRepository<T>) {}

	async execute(queryParams?: string): Promise<Response<T>> {
		return await this.repository.getAll(queryParams)
	}
}
