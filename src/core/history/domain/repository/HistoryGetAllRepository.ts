import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type HistoryDto } from '../dto/History.dto'

export abstract class HistoryGetAllRepository extends GetAllRepository<HistoryDto> {}
