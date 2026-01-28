import { fetching } from '@/shared/api/api'
import { type ModelSaveRepository } from '../../domain/repository/ModelSaveRepository'
import { type ModelPrimitives } from '../../domain/dto/Model.dto'
import { modelUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the ModelSaveRepository interface using the fetching utility.
 * This service is responsible for saving (creating) and updating model data via the API.
 */
export class ModelSaveService implements ModelSaveRepository {
	/**
	 * Saves a new model record.
	 * @param params - An object containing the payload for the new model.
	 * @param params.payload - The ModelPrimitives object containing the model data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async save({ payload }: { payload: ModelPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: modelUrl,
			data: payload
		})
	}

	/**
	 * Updates an existing model record.
	 * @param params - An object containing the ID of the model to update and the payload.
	 * @param params.id - The ID of the model to update.
	 * @param params.payload - The ModelPrimitives object containing the updated model data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async update({
		id,
		payload
	}: {
		id: string
		payload: ModelPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${modelUrl}/${id}`,
			data: payload
		})
	}
}
