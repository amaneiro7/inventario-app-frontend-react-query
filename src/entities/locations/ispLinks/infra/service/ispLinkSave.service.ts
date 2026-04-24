import { fetching } from '@/shared/api/api'
import { ispLinkUrl } from '../../domain/entity/baseUrl'
import { ISPLinkSaveRepository } from '../../domain/repository/ISPLinkSaveRepository'
import { type ISPLinkPrimitives } from '../../domain/dto/ISPLink.dto'

export class ISPLinkSaveService implements ISPLinkSaveRepository {
	async save({ payload }: { payload: ISPLinkPrimitives }): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: ispLinkUrl, data: payload })
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: ISPLinkPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${ispLinkUrl}/${id}`,
			data: payload
		})
	}
}
