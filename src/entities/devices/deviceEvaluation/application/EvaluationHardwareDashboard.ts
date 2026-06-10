import type { EvaluationHardwareDashboardResponse } from '../domain/dto/EvaluationHardwareDashboard.dto'
import type { HardwareEvaluationRepository } from '../domain/repository/HardwareEvaluationRepository'

/**
 * @class EvaluationHardwareDashboard
 * @description Application service to retrieve general dashboard data.
 */
export class EvaluationHardwareDashboard {
	/**
	 * @param {HardwareEvaluationRepository} hardwareEvaluationRepository - The repository to fetch general dashboard data.
	 */
	constructor(private readonly hardwareEvaluationRepository: HardwareEvaluationRepository) {}

	/**
	 * @description Executes the data fetching process.
	 * @returns {Promise<EvaluationHardwareDashboardResponse>} A promise that resolves to the general dashboard DTO.
	 */
	async execute(queryParams?: string): Promise<EvaluationHardwareDashboardResponse> {
		return await this.hardwareEvaluationRepository.findPendingDevices(queryParams)
	}
}
