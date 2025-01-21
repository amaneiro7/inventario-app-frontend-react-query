import { fetching } from '@/api/api'
import { siteUrl } from '../domain/entity/baseUrl'
import { type SiteGetRepository } from '../domain/repository/SiteGetRepository'
import { type SiteDto } from '../domain/dto/Site.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SiteId } from '../domain/value-object/SiteId'

export class SiteGetService implements SiteGetRepository {
	async getById({ id }: { id: Primitives<SiteId> }): Promise<SiteDto> {
		return await fetching<SiteDto>({
			url: siteUrl,
			method: 'GET',
			params: id
		})
	}
}
