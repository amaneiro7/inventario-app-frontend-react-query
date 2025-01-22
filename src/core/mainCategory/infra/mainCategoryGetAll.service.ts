import { fetching } from '@/api/api'
import { type MainCategoryGetAllRepository } from '../domain/repository/MainCategoryGetAllRepository'
import { type MainCategoryDto } from '../domain/dto/MainCategory.dto'
import { mainCategoryUrl } from '../domain/entity/baseUrl'

export class MainCategoryGetAllService implements MainCategoryGetAllRepository {
	async getAll(): Promise<MainCategoryDto[]> {
		return await fetching<MainCategoryDto[]>({
			url: mainCategoryUrl,
			method: 'GET'
		})
	}
}
