import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type OperatingSystemArqDto } from '../domain/dto/OperatingSystemArq.dto'

export class OperatingSystemArqGetAll extends GetAllBaseService<OperatingSystemArqDto> {}
