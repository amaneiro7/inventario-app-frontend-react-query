import { fetching } from '@/api/api'
import { type DeviceGetAllRepository } from '../domain/repository/DeviceGetAllRepository'
import { type DeviceDto } from '../domain/dto/Device.dto'
import { deviceUrl } from '../domain/entity/baseUrl'

export class DeviceGetAllService implements DeviceGetAllRepository {
	async getAll(): Promise<DeviceDto[]> {
		return await fetching<DeviceDto[]>({
			url: deviceUrl,
			method: 'GET'
		})
	}
}
