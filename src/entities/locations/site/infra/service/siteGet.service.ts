import { fetching } from '@/shared/api/api'
import { siteUrl } from '../../domain/entity/baseUrl'
import { type SiteGetRepository } from '../../domain/repository/SiteGetRepository'
import { type SiteDto } from '../../domain/dto/Site.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type SiteId } from '../../domain/value-object/SiteId'

export class SiteGetService implements SiteGetRepository {
	async getById({ id }: { id: Primitives<SiteId> }): Promise<SiteDto> {
		return await fetching<SiteDto>({
			url: `${siteUrl}/${id}`,
			method: 'GET'
		})
	}
}
