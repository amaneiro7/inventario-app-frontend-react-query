import { type HistoryDashboardDto } from '../dto/HistoryDashboard.dto'

export abstract class HistoryDashboardRepository {
	abstract get(): Promise<HistoryDashboardDto>
}
