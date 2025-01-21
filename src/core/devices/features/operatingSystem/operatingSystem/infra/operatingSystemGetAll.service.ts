import { fetching } from '@/api/api'
import { type OperatingSystemDto } from '../domain/dto/OperatingSystem.dto'
import { type OperatingSystemGetAllRepository } from '../domain/repository/OperatingSystemGetAllRepository'
import { operatingSystemUrl } from '../domain/entity/baseUrl'

export class OperatingSystemGetAllService
	implements OperatingSystemGetAllRepository
{
	async getAll(): Promise<OperatingSystemDto[]> {
		return await fetching<OperatingSystemDto[]>({
			url: operatingSystemUrl,
			method: 'GET'
		})
	}
}
