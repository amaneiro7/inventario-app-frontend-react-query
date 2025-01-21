import { fetching } from '@/api/api'
import { type StatusDto } from '../domain/dto/Status.dto'
import { type StatusGetAllRepository } from '../domain/repository/StatusGetAllRepository'
import { statusUrl } from '../domain/entity/baseUrl'

export class StatusGetAllService implements StatusGetAllRepository {
	async getAll(): Promise<StatusDto[]> {
		return await fetching<StatusDto[]>({ url: statusUrl, method: 'GET' })
	}
}
