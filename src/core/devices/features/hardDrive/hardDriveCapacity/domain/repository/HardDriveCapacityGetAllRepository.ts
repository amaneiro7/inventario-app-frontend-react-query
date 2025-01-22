import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { HardDriveCapacityDto } from '../dto/HardDriveCapacity.dto'

export abstract class HardDriveCapacityGetAllRepository extends GetAllRepository<HardDriveCapacityDto> {}
