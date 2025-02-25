import { fetching } from '@/api/api'
import { type HardDriveCapacityDto } from '@/core/devices/features/hardDrive/hardDriveCapacity/domain/dto/HardDriveCapacity.dto'
import { type HardDriveCapacityGetAllRepository } from '@/core/devices/features/hardDrive/hardDriveCapacity/domain/repository/HardDriveCapacityGetAllRepository'
import { type Response } from '@/core/shared/domain/methods/Response'
import { hardDriveCapacityUrl } from '@/core/devices/features/hardDrive/hardDriveCapacity/domain/entity/baseUrl'

export class HardDriveCapacityGetAllService implements HardDriveCapacityGetAllRepository {
	async getAll(queryParams: string): Promise<Response<HardDriveCapacityDto>> {
		return await fetching({
			url: `${hardDriveCapacityUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
