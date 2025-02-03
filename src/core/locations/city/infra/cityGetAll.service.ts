import { fetching } from '@/api/api'
import { type CityGetAllRepository } from '../domain/repository/CityGetAllRepository'
import { type CityDto } from '../domain/dto/City.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { cityUrl } from '../domain/entity/baseUrl'

export class CityGetAllService implements CityGetAllRepository {
	async getAll(queryParams: string): Promise<Response<CityDto>> {
		return await fetching({
			url: `${cityUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
