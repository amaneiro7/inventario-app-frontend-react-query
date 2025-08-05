import { type GeneralDashboardDto } from '../domain/dto/GeneralDashboard.dto'
import { type GeneralDashboardRepository } from '../domain/repository/GeneralDashboardRepository'

/**
 * @class GetGeneralDashboard
 * @description Application service to retrieve general dashboard data.
 */
export class GetGeneralDashboard {
	/**
	 * @param {GeneralDashboardRepository} generalDashboardRepository - The repository to fetch general dashboard data.
	 */	constructor(private readonly generalDashboardRepository: GeneralDashboardRepository) {}

	/**
	 * @description Executes the data fetching process.
	 * @returns {Promise<GeneralDashboardDto>} A promise that resolves to the general dashboard DTO.
	 */	async execute(): Promise<GeneralDashboardDto> {
		return await this.generalDashboardRepository.get()
	}
}