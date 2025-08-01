import { fetching } from '@/shared/api/api'
import { type StatusDto } from '../../domain/dto/Status.dto'
import { type StatusGetAllRepository } from '../../domain/repository/StatusGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { statusUrl } from '../../domain/entity/baseUrl'

export class StatusGetAllService implements StatusGetAllRepository {
	async getAll(queryParams: string): Promise<Response<StatusDto>> {
		return await fetching({
			url: `${statusUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
