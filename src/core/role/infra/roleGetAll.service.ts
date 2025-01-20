import { fetching } from "@/api/api";
import { type RoleDTO } from "../domain/Role.interface";
import { type RoleGetAllRepository } from "../domain/RoleGetAllRepository";

export class RoleGetAllService implements RoleGetAllRepository {
    async getAll(): Promise<RoleDTO[]> {
        return await fetching<RoleDTO[]>({ url: 'roles', method: 'GET' })
    }
}