import { GetAllBaseService } from "@/core/shared/domain/methods/getAll.abstract"
import { type RoleDTO } from "../domain/Role.interface"

export class RoleGetAll extends GetAllBaseService<RoleDTO> { }