import { type GeneralDashboardDto } from '../domain/dto/GeneralDashboard.dto'
import { type GeneralDashboardRepository } from '../domain/repository/GeneralDashboardRepository'

export class GetGeneralDashboard {
	constructor(private readonly generalDashboardRepository: GeneralDashboardRepository) {}

	async execute(): Promise<GeneralDashboardDto> {
		return await this.generalDashboardRepository.get()
	}
}
