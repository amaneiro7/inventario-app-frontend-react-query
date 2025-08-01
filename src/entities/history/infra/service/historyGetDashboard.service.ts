import { fetching } from '@/shared/api/api'
import { type HistoryDashboardRepository } from '../../domain/repository/HistoryDashboardRepository'
import { type HistoryDashboardDto } from '../../domain/dto/HistoryDashboard.dto'
import { historyDashboardUrl } from '../../domain/entity/baseUrl'

export class HistoryDashboardService implements HistoryDashboardRepository {
	async get(): Promise<HistoryDashboardDto> {
		return await fetching({
			url: historyDashboardUrl,
			method: 'GET'
		})
	}
}
