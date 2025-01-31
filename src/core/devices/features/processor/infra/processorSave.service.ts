import { fetching } from '@/api/api'
import { type ProcessorSaveRepository } from '../domain/repository/ProcessorSaveRepository'
import { type ProcessorPrimitives } from '../domain/dto/Processor.dto'
import { processorUrl } from '../domain/entity/baseUrl'

export class ProcessorSaveService implements ProcessorSaveRepository {
	async save({ payload }: { payload: ProcessorPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: processorUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: ProcessorPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${processorUrl}/${id}`,
			data: payload,
			params: id
		})
	}
}
