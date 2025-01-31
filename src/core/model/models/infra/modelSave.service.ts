import { fetching } from '@/api/api'
import { type ModelSaveRepository } from '../domain/repository/ModelSaveRepository'
import { type ModelPrimitives } from '../domain/dto/Model.dto'
import { modelUrl } from '../domain/entity/baseUrl'

export class ModelSaveService implements ModelSaveRepository {
	async save({ payload }: { payload: ModelPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: modelUrl,
			data: payload
		})
	}

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
