import { fetching } from '@/api/api'
import { type ModelGetAllRepository } from '../domain/repository/ModelGetAllRepository'
import { type ModelDto } from '../domain/dto/Model.dto'
import { modelUrl } from '../domain/entity/baseUrl'

export class ModelGetAllService implements ModelGetAllRepository {
	async getAll(): Promise<ModelDto[]> {
		return await fetching<ModelDto[]>({
			url: modelUrl,
			method: 'GET'
		})
	}
}
