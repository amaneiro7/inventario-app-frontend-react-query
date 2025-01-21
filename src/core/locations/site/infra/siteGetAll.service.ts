import { fetching } from '@/api/api'
import { type SiteGetAllRepository } from '../domain/repository/SiteGetAllRepository'
import { type SiteDto } from '../domain/dto/Site.dto'
import { siteUrl } from '../domain/entity/baseUrl'

export class SiteGetAllService implements SiteGetAllRepository {
	async getAll(): Promise<SiteDto[]> {
		return await fetching<SiteDto[]>({ url: siteUrl, method: 'GET' })
	}
}
