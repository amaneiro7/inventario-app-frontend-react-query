import { fetching } from '@/api/api'
import { type CategoryGetAllRepository } from '../domain/repository/CategoryGetAllRepository'
import { type CategoryDTO } from '../domain/dto/Category.dto'
import { categoryUrl } from '../domain/domain/baseUrl'

export class CategoryGetAllService implements CategoryGetAllRepository {
	async getAll(): Promise<CategoryDTO[]> {
		return await fetching<CategoryDTO[]>({
			url: categoryUrl,
			method: 'GET'
		})
	}
}
