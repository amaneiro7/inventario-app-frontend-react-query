import { fetching } from '@/api/api'
import { modelUrl } from '../domain/entity/baseUrl'
import { type ModelGetRepository } from '../domain/repository/ModelGetRepository'
import { type AllModelsDto } from '../domain/dto/AllModels.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelId } from '../domain/value-object/ModelId'

export class ModelGetService implements ModelGetRepository {
	async getById({ id }: { id: Primitives<ModelId> }): Promise<AllModelsDto> {
		return await fetching<AllModelsDto>({
			url: `${modelUrl}/${id}`,
			method: 'GET'
		})
	}
}
