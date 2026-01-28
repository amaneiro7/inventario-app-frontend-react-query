import { type ComputerDashboardDto } from '../domain/dto/ComputerDashboard.dto'
import { type ComputerDashboardRepository } from '../domain/repository/ComputerDashboardRepository'

/**
 * @class GetComputerDashboard
 * @description Application service to retrieve computer dashboard data.
 */
export class GetComputerDashboard {
	/**
	 * @param {ComputerDashboardRepository} computerDashboardRepository - The repository to fetch dashboard data.
	 */ constructor(private readonly computerDashboardRepository: ComputerDashboardRepository) {}

	/**
	 * @description Executes the data fetching process.
	 * @returns {Promise<ComputerDashboardDto>} A promise that resolves to the computer dashboard DTO.
	 */ async execute(): Promise<ComputerDashboardDto> {
		return await this.computerDashboardRepository.get()
	}
}
