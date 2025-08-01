import { type HistoryDashboardDto } from '../domain/dto/HistoryDashboard.dto'
import { type HistoryDashboardRepository } from '../domain/repository/HistoryDashboardRepository'

export class GetHistoryDashboard {
	constructor(private readonly historyDashboardRepository: HistoryDashboardRepository) {}

	async execute(): Promise<HistoryDashboardDto> {
		return await this.historyDashboardRepository.get()
	}
}
