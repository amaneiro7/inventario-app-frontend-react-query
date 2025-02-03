import { fetching } from '@/api/api'
import { type BrandGetAllRepository } from '../domain/repository/BrandGetAllRepository'
import { type BrandDto } from '../domain/dto/Brand.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { brandUrl } from '../domain/entity/baseUrl'

export class BrandGetAllService implements BrandGetAllRepository {
	async getAll(queryParams?: string): Promise<Response<BrandDto>> {
		return await fetching({ url: `${brandUrl}?${queryParams}`, method: 'GET' })
	}
}
