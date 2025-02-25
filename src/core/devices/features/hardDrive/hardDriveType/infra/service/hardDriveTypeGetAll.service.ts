import { fetching } from '@/api/api'
import { type HardDriveTypeDto } from '../domain/dto/HardDriveType.dto'
import { type HardDriveTypeGetAllRepository } from '../domain/repository/HardDriveTypeGetAllRepository'
import { type Response } from '@/core/shared/domain/methods/Response'
import { hardDriveTypeUrl } from '../domain/entity/baseUrl'

export class HardDriveTypeGetAllService implements HardDriveTypeGetAllRepository {
	async getAll(queryParams: string): Promise<Response<HardDriveTypeDto>> {
		return await fetching({
			url: `${hardDriveTypeUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
