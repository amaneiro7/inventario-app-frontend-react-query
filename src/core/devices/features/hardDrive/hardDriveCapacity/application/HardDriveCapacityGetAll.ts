import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type HardDriveCapacityDto } from '../domain/dto/HardDriveCapacity.dto'

export class HardDriveCapacityGetAll extends GetAllBaseService<HardDriveCapacityDto> {}
