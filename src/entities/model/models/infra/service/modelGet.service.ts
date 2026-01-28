import { fetching } from '@/shared/api/api'
import { modelUrl } from '../../domain/entity/baseUrl'
import { type ModelGetRepository } from '../../domain/repository/ModelGetRepository'
import { type ModelDto } from '../../domain/dto/Model.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ModelId } from '../../domain/value-object/ModelId'

/**
 * Implementation of the ModelGetRepository interface using the fetching utility.
 * This service is responsible for retrieving model data from the API.
 */
export class ModelGetService implements ModelGetRepository {
	/**
	 * Retrieves a model by its ID.
	 * @param params - An object containing the ID of the model to retrieve.
	 * @param params.id - The primitive value of the ModelId.
	 * @returns A Promise that resolves to the ModelDto.
	 */
	async getById({ id }: { id: Primitives<ModelId> }): Promise<ModelDto> {
		return await fetching<ModelDto>({
			url: `${modelUrl}/${id}`,
			method: 'GET'
		})
	}
}
