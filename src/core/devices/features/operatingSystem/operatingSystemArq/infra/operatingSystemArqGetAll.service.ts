import { fetching } from '@/api/api'
import { type OperatingSystemArqDto } from '../domain/dto/OperatingSystemArq.dto'
import { type OperatingSystemArqGetAllRepository } from '../domain/repository/OperatingSystemArqGetAllRepository'
import { type Response } from '@/core/shared/domain/methods/Response'
import { operatingSystemArqUrl } from '../domain/entity/baseUrl'

export class OperatingSystemArqGetAllService implements OperatingSystemArqGetAllRepository {
	async getAll(queryParams: string): Promise<Response<OperatingSystemArqDto>> {
		return await fetching({
			url: `${operatingSystemArqUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
