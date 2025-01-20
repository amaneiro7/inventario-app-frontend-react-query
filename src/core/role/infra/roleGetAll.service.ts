import { fetching } from '@/api/api'
import { type RoleDTO } from '../domain/dto/Role.dto'
import { type RoleGetAllRepository } from '../domain/repository/RoleGetAllRepository'
import { roleUrl } from '../domain/entity/baseUrl'

export class RoleGetAllService implements RoleGetAllRepository {
  async getAll(): Promise<RoleDTO[]> {
    return await fetching<RoleDTO[]>({ url: roleUrl, method: 'GET' })
  }
}
