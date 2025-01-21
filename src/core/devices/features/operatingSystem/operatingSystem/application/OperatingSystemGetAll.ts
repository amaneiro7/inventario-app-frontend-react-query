import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type OperatingSystemDto } from '../domain/dto/OperatingSystem.dto'

export class OperatingSystemGetAll extends GetAllBaseService<OperatingSystemDto> {}
