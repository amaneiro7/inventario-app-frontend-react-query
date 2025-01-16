import { RoleDTO } from "./Role.interface";

export abstract class RoleGetAllRepository {
    abstract getAll(): Promise<RoleDTO[]>
}