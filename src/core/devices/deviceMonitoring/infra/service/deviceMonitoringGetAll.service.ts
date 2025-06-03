import { fetching } from '@/api/api'
import { deviceMonitoringUrl } from '../../domain/entity/baseUrl'
import { type DeviceMonitoringGetAllRepository } from '../../domain/repository/DeviceMonitoringGetAllRepository'
import { type DeviceMonitoringDto } from '../../domain/dto/DeviceMonitoring.dto'
import { type Response } from '@/core/shared/domain/methods/Response'

export class DeviceMonitoringGetAllService implements DeviceMonitoringGetAllRepository {
	async getAll(queryParams?: string): Promise<Response<DeviceMonitoringDto>> {
		return await fetching({
			url: `${deviceMonitoringUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
