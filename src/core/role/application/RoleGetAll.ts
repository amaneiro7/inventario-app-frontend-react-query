import { type RoleDto } from '../domain/dto/Role.dto'
import { type RoleGetAllRepository } from '../domain/repository/RoleGetAllRepository'

export class RoleGetAll {
	constructor(private readonly repository: RoleGetAllRepository) {}

	async execute(queryParams?: string): Promise<RoleDto> {
		return await this.repository.getAll(queryParams)
	}
}
