import { fetching } from '@/shared/api/api'
import { type CategoryGetAllRepository } from '@/entities/category/domain/repository/CategoryGetAllRepository'
import { type CategoryDto } from '@/entities/category/domain/dto/Category.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { categoryUrl } from '@/entities/category/domain/entity/baseUrl'

export class CategoryGetAllService implements CategoryGetAllRepository {
	async getAll(queryParams: string): Promise<Response<CategoryDto>> {
		return await fetching({
			url: `${categoryUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
