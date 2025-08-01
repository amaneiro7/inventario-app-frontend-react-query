import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type OperatingSystemDto } from '../domain/dto/OperatingSystem.dto'

export class OperatingSystemGetAll extends GetAllBaseService<OperatingSystemDto> {}
