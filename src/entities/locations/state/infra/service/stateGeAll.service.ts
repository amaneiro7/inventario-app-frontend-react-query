import { fetching } from '@/shared/api/api'
import { type StateDto } from '../../domain/dto/State.dto'
import { type StateGetAllRepository } from '../../domain/repository/StateGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { stateUrl } from '../../domain/entity/baseUrl'

export class StateGetAllService implements StateGetAllRepository {
	async getAll(queryParams: string): Promise<Response<StateDto>> {
		return await fetching({
			url: `${stateUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
