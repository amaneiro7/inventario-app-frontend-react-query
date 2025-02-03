import { fetching } from '@/api/api'
import { type OperatingSystemDto } from '../domain/dto/OperatingSystem.dto'
import { type OperatingSystemGetAllRepository } from '../domain/repository/OperatingSystemGetAllRepository'
import { type Response } from '@/core/shared/domain/methods/Response'
import { operatingSystemUrl } from '../domain/entity/baseUrl'

export class OperatingSystemGetAllService implements OperatingSystemGetAllRepository {
	async getAll(queryParams: string): Promise<Response<OperatingSystemDto>> {
		return await fetching({
			url: `${operatingSystemUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
