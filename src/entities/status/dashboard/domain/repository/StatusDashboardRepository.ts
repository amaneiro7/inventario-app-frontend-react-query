import { type StatusDashboardDto } from '../dto/StatusDashboard.dto'

export abstract class StatusDashboardRepository {
	abstract get(): Promise<StatusDashboardDto>
}
