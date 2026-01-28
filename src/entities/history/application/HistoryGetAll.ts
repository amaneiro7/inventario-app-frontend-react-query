import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type HistoryDto } from '../domain/dto/History.dto'

/**
 * Service class for retrieving all History entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type HistoryDto.
 */
export class HistoryGetAll extends GetAllBaseService<HistoryDto> {}
