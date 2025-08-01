import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type HistoryDto } from '../domain/dto/History.dto'

export class HistoryGetAll extends GetAllBaseService<HistoryDto> {}
