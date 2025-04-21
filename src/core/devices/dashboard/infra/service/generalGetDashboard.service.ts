import { fetching } from '@/api/api'
import { type GeneralDashboardRepository } from '../../domain/repository/GeneralDashboardRepository'
import { type GeneralDashboardDto } from '../../domain/dto/GeneralDashboard.dto'
import { generalDashboardUrl } from '../../domain/entity/baseUrl'

export class GeneralDashboardService implements GeneralDashboardRepository {
	async get(): Promise<GeneralDashboardDto> {
		return await fetching({
			url: generalDashboardUrl,
			method: 'GET'
		})
	}
}
