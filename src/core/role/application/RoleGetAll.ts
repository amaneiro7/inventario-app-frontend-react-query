import { RoleDTO } from "../domain/Role.interface"
import { RoleGetAllRepository } from "../domain/RoleGetAllRepository"

export class RoleGetAll {
    constructor(private readonly roleGetAllRepository: RoleGetAllRepository) { }

    async execute(): Promise<RoleDTO[]> {
        return await this.roleGetAllRepository.getAll()
    }
}