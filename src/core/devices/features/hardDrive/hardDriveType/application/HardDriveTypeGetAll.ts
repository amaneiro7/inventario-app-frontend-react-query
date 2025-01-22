import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type HardDriveTypeDto } from '../domain/dto/HardDriveType.dto'

export class HardDriveTypeGetAll extends GetAllBaseService<HardDriveTypeDto> {}
