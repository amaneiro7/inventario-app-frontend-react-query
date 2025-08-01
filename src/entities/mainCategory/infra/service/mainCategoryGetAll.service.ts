import { fetching } from '@/shared/api/api'
import { type MainCategoryGetAllRepository } from '../../domain/repository/MainCategoryGetAllRepository'
import { type MainCategoryDto } from '../../domain/dto/MainCategory.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { mainCategoryUrl } from '../../domain/entity/baseUrl'

export class MainCategoryGetAllService implements MainCategoryGetAllRepository {
	async getAll(queryParams: string): Promise<Response<MainCategoryDto>> {
		return await fetching({
			url: `${mainCategoryUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
