import { type StatusDashboardDto } from '../domain/dto/StatusDashboard.dto'
import { type StatusDashboardRepository } from '../domain/repository/StatusDashboardRepository'

export class GetStatusDashboard {
	constructor(private readonly StatusDashboardRepository: StatusDashboardRepository) {}

	async execute(): Promise<StatusDashboardDto> {
		return await this.StatusDashboardRepository.get()
	}
}
