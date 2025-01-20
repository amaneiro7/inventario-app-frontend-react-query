import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { RoleDTO } from '../dto/Role.dto'

export abstract class RoleGetAllRepository extends GetAllRepository<RoleDTO> {}
