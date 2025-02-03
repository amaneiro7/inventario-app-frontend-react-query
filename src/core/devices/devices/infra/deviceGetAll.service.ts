import { fetching } from '@/api/api'
import { type DeviceGetAllRepository } from '../domain/repository/DeviceGetAllRepository'
import { type DeviceDto } from '../domain/dto/Device.dto'
import { deviceUrl } from '../domain/entity/baseUrl'
import { Response } from '@/core/shared/domain/methods/Response'

export class DeviceGetAllService implements DeviceGetAllRepository {
	async getAll(queryParams: string): Promise<Response<DeviceDto>> {
		return await fetching({
			url: `${deviceUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
