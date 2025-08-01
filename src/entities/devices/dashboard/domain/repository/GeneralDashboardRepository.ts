import { type GeneralDashboardDto } from '../dto/GeneralDashboard.dto'

export abstract class GeneralDashboardRepository {
	abstract get(): Promise<GeneralDashboardDto>
}
