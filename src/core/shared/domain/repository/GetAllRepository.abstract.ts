import { type Response } from '../methods/Response'

export abstract class GetAllRepository<T> {
	abstract getAll(queryParams?: string): Promise<Response<T>>
}
