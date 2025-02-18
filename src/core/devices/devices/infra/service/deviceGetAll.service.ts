import { fetching } from '@/api/api'
import { type DeviceGetAllRepository } from '../../domain/repository/DeviceGetAllRepository'
import { type DeviceDto } from '../../domain/dto/Device.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { deviceUrl } from '../../domain/entity/baseUrl'

export class DeviceGetAllService implements DeviceGetAllRepository {
	async getAll(queryParams: string): Promise<Response<DeviceDto>> {
		return await fetching({
			url: `${deviceUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
