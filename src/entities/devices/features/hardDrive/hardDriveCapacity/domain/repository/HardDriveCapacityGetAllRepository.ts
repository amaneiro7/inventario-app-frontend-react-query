import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { HardDriveCapacityDto } from '../dto/HardDriveCapacity.dto'

export abstract class HardDriveCapacityGetAllRepository extends GetAllRepository<HardDriveCapacityDto> {}
