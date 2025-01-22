import { fetching } from '@/api/api'
import { type CategoryGetAllRepository } from '../domain/repository/CategoryGetAllRepository'
import { type CategoryDto } from '../domain/dto/Category.dto'
import { categoryUrl } from '../domain/entity/baseUrl'

export class CategoryGetAllService implements CategoryGetAllRepository {
	async getAll(): Promise<CategoryDto[]> {
		return await fetching<CategoryDto[]>({
			url: categoryUrl,
			method: 'GET'
		})
	}
}
