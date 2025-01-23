import { fetching } from '@/api/api'
import { modelUrl } from '../domain/entity/baseUrl'
import { type ModelGetRepository } from '../domain/repository/ModelGetRepository'
import { type ModelDto } from '../domain/dto/Model.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelId } from '../domain/value-object/ModelId'

export class ModelGetService implements ModelGetRepository {
	async getById({ id }: { id: Primitives<ModelId> }): Promise<ModelDto> {
		return await fetching<ModelDto>({
			url: `${modelUrl}/${id}`,
			method: 'GET'
		})
	}
}
