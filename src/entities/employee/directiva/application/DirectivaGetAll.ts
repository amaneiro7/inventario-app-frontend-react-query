import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type DirectivaDto } from '../domain/dto/Directiva.dto'

/**
 * Service class for retrieving all Directiva entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type DirectivaDto.
 */
export class DirectivaGetAll extends GetAllBaseService<DirectivaDto> {}
