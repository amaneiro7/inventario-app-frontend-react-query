import { fetching } from '@/shared/api/api'
import { roleUrl } from '../../domain/entity/baseUrl'
import { type RoleDto } from '../../domain/dto/Role.dto'
import { type RoleGetAllRepository } from '../../domain/repository/RoleGetAllRepository'
import { type Response } from '@/entities/shared/domain/methods/Response'

export class RoleGetAllService implements RoleGetAllRepository {
	async getAll(queryParams: string): Promise<Response<RoleDto>> {
		return await fetching({
			url: `${roleUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
