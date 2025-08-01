import { fetching } from '@/shared/api/api'
import { type LocationGetAllRepository } from '../../domain/repository/LocationGetAllRepository'
import { type LocationDto } from '../../domain/dto/Location.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { locationUrl } from '../../domain/entity/baseUrl'

export class LocationGetAllService implements LocationGetAllRepository {
	async getAll(queryParams?: string): Promise<Response<LocationDto>> {
		return await fetching({
			url: `${locationUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
