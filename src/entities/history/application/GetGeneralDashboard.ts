import { type HistoryDashboardDto } from '../domain/dto/HistoryDashboard.dto'
import { type HistoryDashboardRepository } from '../domain/repository/HistoryDashboardRepository'

/**
 * Service class responsible for retrieving general history dashboard data.
 * It interacts with a HistoryDashboardRepository to fetch the data.
 */
export class GetHistoryDashboard {
	/**
	 * Constructs a GetHistoryDashboard instance.
	 * @param historyDashboardRepository - The repository responsible for fetching history dashboard data.
	 */
	constructor(private readonly historyDashboardRepository: HistoryDashboardRepository) {}

	/**
	 * Executes the retrieval of the history dashboard data.
	 * @returns A Promise that resolves to the HistoryDashboardDto.
	 */
	async execute(): Promise<HistoryDashboardDto> {
		return await this.historyDashboardRepository.get()
	}
}
