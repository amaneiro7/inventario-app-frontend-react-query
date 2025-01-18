import { GetAllBaseService } from "@/core/shared/domain/methods/getAll.abstract"
import { type RoleDTO } from "../domain/Role.interface"
import { type RoleGetAllRepository } from "../domain/RoleGetAllRepository"

export class RoleGetAll extends GetAllBaseService<RoleDTO> {
    constructor(roleRepository: RoleGetAllRepository) {
        super(roleRepository)
    }
}