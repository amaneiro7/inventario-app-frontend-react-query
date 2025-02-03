import { fetching } from '@/api/api'
import { type RoleDto } from '../domain/dto/Role.dto'
import { type RoleGetAllRepository } from '../domain/repository/RoleGetAllRepository'
import { type Response } from '@/core/shared/domain/methods/Response'
import { roleUrl } from '../domain/entity/baseUrl'

export class RoleGetAllService implements RoleGetAllRepository {
	async getAll(queryParams: string): Promise<Response<RoleDto>> {
		return await fetching({
			url: `${roleUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
