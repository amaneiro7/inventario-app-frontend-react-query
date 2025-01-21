import { fetching } from '@/api/api'
import { type MainCategoryGetAllRepository } from '../domain/repository/MainCategoryGetAllRepository'
import { type MainCategoryDTO } from '../domain/dto/MainCategory.dto'
import { mainCategoryUrl } from '../domain/entity/baseUrl'

export class MainCategoryGetAllService implements MainCategoryGetAllRepository {
	async getAll(): Promise<MainCategoryDTO[]> {
		return await fetching<MainCategoryDTO[]>({
			url: mainCategoryUrl,
			method: 'GET'
		})
	}
}
