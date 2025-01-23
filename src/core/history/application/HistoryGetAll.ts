import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type HistoryDto } from '../domain/dto/History.dto'

export class HistoryGetAll extends GetAllBaseService<HistoryDto> {}
