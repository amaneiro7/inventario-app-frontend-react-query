import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { HardDriveTypeDto } from '../dto/HardDriveType.dto'

export abstract class HardDriveTypeGetAllRepository extends GetAllRepository<HardDriveTypeDto> {}
