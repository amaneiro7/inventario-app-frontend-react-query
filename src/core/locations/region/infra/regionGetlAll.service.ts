import { fetching } from '@/api/api'
import { type RegionGetAllRepository } from '../domain/repository/RegionGetAllRepository'
import { type RegionDTO } from '../domain/dto/region.dto'
import { regionUrl } from '../domain/entity/baseUrl'

export class RegionGetAllService implements RegionGetAllRepository {
	async getAll(): Promise<RegionDTO[]> {
		return await fetching<RegionDTO[]>({ url: regionUrl, method: 'GET' })
	}
}
