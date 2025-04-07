import { fetching } from '@/api/api'
import { type AdministrativeRegionGetAllRepository } from '../../domain/repository/AdministrativeRegionGetAllRepository'
import { type AdministrativeRegionDto } from '../../domain/dto/administrativeRegion.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { administrativeRegionUrl } from '../../domain/entity/baseUrl'

export class AdministrativeRegionGetAllService implements AdministrativeRegionGetAllRepository {
	async getAll(queryParams: string): Promise<Response<AdministrativeRegionDto>> {
		return await fetching({
			url: `${administrativeRegionUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
