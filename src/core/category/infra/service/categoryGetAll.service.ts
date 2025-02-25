import { fetching } from '@/api/api'
import { type CategoryGetAllRepository } from '@/core/category/domain/repository/CategoryGetAllRepository'
import { type CategoryDto } from '@/core/category/domain/dto/Category.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { categoryUrl } from '@/core/category/domain/entity/baseUrl'

export class CategoryGetAllService implements CategoryGetAllRepository {
	async getAll(queryParams: string): Promise<Response<CategoryDto>> {
		return await fetching({
			url: `${categoryUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
