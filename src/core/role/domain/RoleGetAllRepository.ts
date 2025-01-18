import { GetAllRepository } from "@/core/shared/domain/value-objects/GetAllRepository.abstract";
import { type RoleDTO } from "./Role.interface";

export abstract class RoleGetAllRepository extends GetAllRepository<RoleDTO> { }