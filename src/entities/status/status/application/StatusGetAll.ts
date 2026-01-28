import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type StatusDto } from '../domain/dto/Status.dto'

/**
 * Service class for retrieving all Status entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type StatusDto.
 */
export class StatusGetAll extends GetAllBaseService<StatusDto> {}
