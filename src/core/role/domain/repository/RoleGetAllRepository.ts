import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type RoleDto } from '../dto/Role.dto'

export abstract class RoleGetAllRepository extends GetAllRepository<RoleDto> {}
