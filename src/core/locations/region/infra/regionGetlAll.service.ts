import { fetching } from '@/api/api'
import { type RegionGetAllRepository } from '../domain/repository/RegionGetAllRepository'
import { type RegionDTO } from '../domain/dto/region.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { regionUrl } from '../domain/entity/baseUrl'

export class RegionGetAllService implements RegionGetAllRepository {
	async getAll(queryParams: string): Promise<Response<RegionDTO>> {
		return await fetching({
			url: `${regionUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
