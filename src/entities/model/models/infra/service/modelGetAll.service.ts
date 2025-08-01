import { fetching } from '@/shared/api/api'
import { type ModelGetAllRepository } from '../../domain/repository/ModelGetAllRepository'
import { type ModelDto } from '../../domain/dto/Model.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { modelUrl } from '../../domain/entity/baseUrl'

export class ModelGetAllService implements ModelGetAllRepository {
	async getAll(queryParams: string): Promise<Response<ModelDto>> {
		return await fetching({
			url: `${modelUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
