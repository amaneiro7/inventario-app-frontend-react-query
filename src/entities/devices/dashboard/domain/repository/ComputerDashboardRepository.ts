import { type ComputerDashboardDto } from '../dto/ComputerDashboard.dto'

export abstract class ComputerDashboardRepository {
	abstract get(): Promise<ComputerDashboardDto>
}
