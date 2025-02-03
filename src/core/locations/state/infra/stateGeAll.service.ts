import { fetching } from '@/api/api'
import { type StateGetAllRepository } from '../domain/repository/StateGetAllRepository'
import { type StateDto } from '../domain/dto/State.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { stateUrl } from '../domain/entity/baseUrl'

export class StateGetAllService implements StateGetAllRepository {
	async getAll(queryParams: string): Promise<Response<StateDto>> {
		return await fetching({
			url: `${stateUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
