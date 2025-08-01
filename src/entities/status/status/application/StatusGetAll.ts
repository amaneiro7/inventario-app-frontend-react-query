import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type StatusDto } from '../domain/dto/Status.dto'

export class StatusGetAll extends GetAllBaseService<StatusDto> {}
