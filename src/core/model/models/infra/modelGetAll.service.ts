import { fetching } from '@/api/api'
import { type ModelGetAllRepository } from '../domain/repository/ModelGetAllRepository'
import { type AllModelsDto } from '../domain/dto/AllModels.dto'
import { modelUrl } from '../domain/entity/baseUrl'

export class ModelGetAllService implements ModelGetAllRepository {
	async getAll(): Promise<AllModelsDto[]> {
		return await fetching<AllModelsDto[]>({
			url: modelUrl,
			method: 'GET'
		})
	}
}
