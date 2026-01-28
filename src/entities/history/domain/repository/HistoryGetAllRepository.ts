import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type HistoryDto } from '../dto/History.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all History entities.
 * It extends the generic `GetAllRepository` with `HistoryDto` as the type parameter.
 */
export abstract class HistoryGetAllRepository extends GetAllRepository<HistoryDto> {}
