import { type ComputerDashboardDto } from '../domain/dto/ComputerDashboard.dto'
import { type ComputerDashboardRepository } from '../domain/repository/ComputerDashboardRepository'

export class GetComputerDashboard {
	constructor(private readonly computerDashboardRepository: ComputerDashboardRepository) {}

	async execute(): Promise<ComputerDashboardDto> {
		return await this.computerDashboardRepository.get()
	}
}
