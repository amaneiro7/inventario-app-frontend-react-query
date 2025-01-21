import { fetching } from '@/api/api'
import { type BrandSaveRepository } from '../domain/repository/ProcessorSaveRepository'
import { type BrandPrimitives } from '../domain/dto/Processor.dto'
import { brandUrl } from '../domain/entity/baseUrl'

export class BrandSaveService implements BrandSaveRepository {
	async save({
		payload
	}: {
		payload: BrandPrimitives
	}): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: brandUrl, data: payload })
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: BrandPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: brandUrl,
			data: payload,
			params: id
		})
	}
}
