import { fetching } from '@/api/api'
import { type RoleDto } from '../domain/dto/Role.dto'
import { type RoleGetAllRepository } from '../domain/repository/RoleGetAllRepository'
import { roleUrl } from '../domain/entity/baseUrl'

export class RoleGetAllService implements RoleGetAllRepository {
	async getAll(): Promise<RoleDto[]> {
		return await fetching<RoleDto[]>({ url: roleUrl, method: 'GET' })
	}
}
