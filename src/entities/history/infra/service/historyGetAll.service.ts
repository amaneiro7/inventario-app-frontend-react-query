import { fetching } from '@/shared/api/api'
import { type HistoryGetAllRepository } from '../../domain/repository/HistoryGetAllRepository'
import { type HistoryDto } from '../../domain/dto/History.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { historyUrl } from '../../domain/entity/baseUrl'

export class HistoryGetAllService implements HistoryGetAllRepository {
	async getAll(queryParams: string): Promise<Response<HistoryDto>> {
		return await fetching({
			url: `${historyUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
