import { fetching } from '@/api/api'
import { type RoleDto } from '../../domain/dto/Role.dto'
import { type RoleGetAllRepository } from '../../domain/repository/RoleGetAllRepository'
import { roleUrl } from '../../domain/entity/baseUrl'

export class RoleGetAllService implements RoleGetAllRepository {
	async getAll(queryParams: string): Promise<RoleDto> {
		return await fetching({
			url: `${roleUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
