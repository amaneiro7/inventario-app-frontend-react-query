import { fetching } from '@/shared/api/api'
import { regionUrl } from '../../domain/entity/baseUrl'
import { RegionSaveRepository } from '../../domain/repository/RegionSaveRepository'
import { type RegionPrimitives } from '../../domain/dto/region.dto'

export class RegionSaveService implements RegionSaveRepository {
	async update({
		id,
		payload
	}: {
		id: string
		payload: RegionPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${regionUrl}/${id}`,
			data: payload
		})
	}
}
