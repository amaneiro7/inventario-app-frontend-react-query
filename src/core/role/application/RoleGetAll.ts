import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type RoleDto } from '../domain/dto/Role.dto'

export class RoleGetAll extends GetAllBaseService<RoleDto> {}
