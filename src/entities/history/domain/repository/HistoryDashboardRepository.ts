import { type HistoryDashboardDto } from '../dto/HistoryDashboard.dto'

/**
 * Abstract class for a repository that provides methods for retrieving history dashboard data.
 */
export abstract class HistoryDashboardRepository {
	/**
	 * Abstract method to retrieve the history dashboard data.
	 * @returns A Promise that resolves to a HistoryDashboardDto.
	 */
	abstract get(): Promise<HistoryDashboardDto>
}