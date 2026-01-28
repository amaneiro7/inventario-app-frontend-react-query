import { type StatusDashboardDto } from '../dto/StatusDashboard.dto'

/**
 * Abstract class for a repository that provides methods for retrieving status dashboard data.
 */
export abstract class StatusDashboardRepository {
	/**
	 * Abstract method to retrieve the status dashboard data.
	 * @returns A Promise that resolves to a StatusDashboardDto.
	 */
	abstract get(): Promise<StatusDashboardDto>
}
