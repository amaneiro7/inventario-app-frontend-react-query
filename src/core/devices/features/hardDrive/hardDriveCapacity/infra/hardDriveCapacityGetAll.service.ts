import { fetching } from '@/api/api'
import { type HardDriveCapacityDto } from '../domain/dto/HardDriveCapacity.dto'
import { type HardDriveCapacityGetAllRepository } from '../domain/repository/HardDriveCapacityGetAllRepository'
import { hardDriveCapacityUrl } from '../domain/entity/baseUrl'

export class HardDriveCapacityGetAllService implements HardDriveCapacityGetAllRepository {
	async getAll(): Promise<HardDriveCapacityDto[]> {
		return await fetching<HardDriveCapacityDto[]>({
			url: hardDriveCapacityUrl,
			method: 'GET'
		})
	}
}
