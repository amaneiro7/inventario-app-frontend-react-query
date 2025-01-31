import { fetching } from '@/api/api'
import { type SiteSaveRepository } from '../domain/repository/SiteSaveRepository'
import { type SitePrimitives } from '../domain/dto/Site.dto'
import { siteUrl } from '../domain/entity/baseUrl'

export class SiteSaveService implements SiteSaveRepository {
	async save({ payload }: { payload: SitePrimitives }): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: siteUrl, data: payload })
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: SitePrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${siteUrl}/${id}`,
			data: payload
		})
	}
}
