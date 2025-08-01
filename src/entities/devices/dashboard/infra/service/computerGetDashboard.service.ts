import { fetching } from '@/shared/api/api'
import { type ComputerDashboardRepository } from '../../domain/repository/ComputerDashboardRepository'
import { type ComputerDashboardDto } from '../../domain/dto/ComputerDashboard.dto'
import { computerDashboardUrl } from '../../domain/entity/baseUrl'

export class ComputerDashboardService implements ComputerDashboardRepository {
	async get(): Promise<ComputerDashboardDto> {
		return await fetching({
			url: computerDashboardUrl,
			method: 'GET'
		})
	}
}
