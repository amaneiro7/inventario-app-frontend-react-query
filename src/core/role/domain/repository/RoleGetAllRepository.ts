import { RoleDto } from '../dto/Role.dto'

export abstract class RoleGetAllRepository {
	abstract getAll(queryParams?: string): Promise<RoleDto>
}
