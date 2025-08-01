import { fetching } from '@/shared/api/api'
import { locationMonitoringUrl } from '../../domain/entity/baseUrl'
import { type LocationMonitoringGetAllRepository } from '../../domain/repository/LocationMonitoringGetAllRepository'
import { type LocationMonitoringDto } from '../../domain/dto/LocationMonitoring.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'

export class LocationMonitoringGetAllService implements LocationMonitoringGetAllRepository {
	async getAll(queryParams?: string): Promise<Response<LocationMonitoringDto>> {
		return await fetching({
			url: `${locationMonitoringUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
