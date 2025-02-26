import { fetching } from '@/api/api'
import { type SiteGetAllRepository } from '../../domain/repository/SiteGetAllRepository'
import { type SiteDto } from '../../domain/dto/Site.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { siteUrl } from '../../domain/entity/baseUrl'

export class SiteGetAllService implements SiteGetAllRepository {
	async getAll(queryParams: string): Promise<Response<SiteDto>> {
		return await fetching({
			url: `${siteUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
