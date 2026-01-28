import { type StatusDashboardDto } from '../domain/dto/StatusDashboard.dto'
import { type StatusDashboardRepository } from '../domain/repository/StatusDashboardRepository'

/**
 * Service class responsible for retrieving status dashboard data.
 * It interacts with a StatusDashboardRepository to fetch the data.
 */
export class GetStatusDashboard {
	/**
	 * Constructs a GetStatusDashboard instance.
	 * @param StatusDashboardRepository - The repository responsible for fetching status dashboard data.
	 */
	constructor(private readonly StatusDashboardRepository: StatusDashboardRepository) {}

	/**
	 * Executes the retrieval of the status dashboard data.
	 * @returns A Promise that resolves to the StatusDashboardDto.
	 */
	async execute(): Promise<StatusDashboardDto> {
		return await this.StatusDashboardRepository.get()
	}
}
