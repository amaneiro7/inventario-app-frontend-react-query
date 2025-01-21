import { fetching } from '@/api/api'
import { type OperatingSystemArqDto } from '../domain/dto/OperatingSystemArq.dto'
import { type OperatingSystemArqGetAllRepository } from '../domain/repository/OperatingSystemArqGetAllRepository'
import { operatingSystemArqUrl } from '../domain/entity/baseUrl'

export class OperatingSystemArqGetAllService
	implements OperatingSystemArqGetAllRepository
{
	async getAll(): Promise<OperatingSystemArqDto[]> {
		return await fetching<OperatingSystemArqDto[]>({
			url: operatingSystemArqUrl,
			method: 'GET'
		})
	}
}
