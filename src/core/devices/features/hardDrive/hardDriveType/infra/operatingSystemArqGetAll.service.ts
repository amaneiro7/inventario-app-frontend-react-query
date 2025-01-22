import { fetching } from '@/api/api'
import { type HardDriveTypeDto } from '../domain/dto/HardDriveType.dto'
import { type HardDriveTypeGetAllRepository } from '../domain/repository/HardDriveTypeGetAllRepository'
import { hardDriveTypeUrl } from '../domain/entity/baseUrl'

export class HardDriveTypeGetAllService
	implements HardDriveTypeGetAllRepository
{
	async getAll(): Promise<HardDriveTypeDto[]> {
		return await fetching<HardDriveTypeDto[]>({
			url: hardDriveTypeUrl,
			method: 'GET'
		})
	}
}
