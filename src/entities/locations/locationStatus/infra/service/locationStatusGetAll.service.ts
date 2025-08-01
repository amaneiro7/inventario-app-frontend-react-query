import { fetching } from '@/shared/api/api'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { type LocationStatusGetAllRepository } from '../../domain/repository/LocationStatusGetAllRepository'
import { type LocationStatusDto } from '../../domain/dto/LocationStatus.dto'
import { locationStatusUrl } from '../../domain/entity/baseUrl'

export class LocationStatusGetAllService implements LocationStatusGetAllRepository {
	async getAll(queryParams: string): Promise<Response<LocationStatusDto>> {
		return await fetching({
			url: `${locationStatusUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
