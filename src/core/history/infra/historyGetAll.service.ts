import { fetching } from '@/api/api'
import { type HistoryGetAllRepository } from '../domain/repository/HistoryGetAllRepository'
import { type HistoryDto } from '../domain/dto/History.dto'
import { historyUrl } from '../domain/entity/baseUrl'

export class HistoryGetAllService implements HistoryGetAllRepository {
	async getAll(): Promise<HistoryDto[]> {
		return await fetching<HistoryDto[]>({
			url: historyUrl,
			method: 'GET'
		})
	}
}
