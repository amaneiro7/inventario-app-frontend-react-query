import { fetching } from '@/api/api'
import { type StatusDashboardRepository } from '../../domain/repository/StatusDashboardRepository'
import { type StatusDashboardDto } from '../../domain/dto/StatusDashboard.dto'
import { statusDashboardUrl } from '../../domain/entity/baseUrl'

export class StatusDashboardService implements StatusDashboardRepository {
	async get(): Promise<StatusDashboardDto> {
		return await fetching({
			url: statusDashboardUrl,
			method: 'GET'
		})
	}
}
