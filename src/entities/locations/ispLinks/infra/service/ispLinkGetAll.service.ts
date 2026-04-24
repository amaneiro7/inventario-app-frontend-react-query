import { fetching } from '@/shared/api/api'
import { type ISPLinkGetAllRepository } from '../../domain/repository/ISPLinkGetAllRepository'
import { type ISPLinkDto } from '../../domain/dto/ISPLink.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { ispLinkUrl } from '../../domain/entity/baseUrl'

export class ISPLinkGetAllService implements ISPLinkGetAllRepository {
	async getAll(queryParams: string): Promise<Response<ISPLinkDto>> {
		return await fetching({
			url: `${ispLinkUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
