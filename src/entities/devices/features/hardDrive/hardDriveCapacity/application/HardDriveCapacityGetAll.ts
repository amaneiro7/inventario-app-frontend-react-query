import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type HardDriveCapacityDto } from '../domain/dto/HardDriveCapacity.dto'

export class HardDriveCapacityGetAll extends GetAllBaseService<HardDriveCapacityDto> {}
