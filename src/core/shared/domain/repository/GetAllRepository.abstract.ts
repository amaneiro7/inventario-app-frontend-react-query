import { type Criteria } from '../criteria/Criteria'

export abstract class GetAllRepository<T> {
	abstract getAll(criteria?: Criteria): Promise<T[]>
}
