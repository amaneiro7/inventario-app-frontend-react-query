import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type RoleDto } from '../domain/dto/Role.dto'

/**
 * Service class for retrieving all Role entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type RoleDto.
 */
export class RoleGetAll extends GetAllBaseService<RoleDto> {}
