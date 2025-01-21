import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type OperatingSystemArqDto } from '../domain/dto/OperatingSystemArq.dto'

export class OperatingSystemArqGetAll extends GetAllBaseService<OperatingSystemArqDto> {}
