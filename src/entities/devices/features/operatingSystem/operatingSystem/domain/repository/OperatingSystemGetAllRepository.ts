import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { OperatingSystemDto } from '../dto/OperatingSystem.dto'

export abstract class OperatingSystemGetAllRepository extends GetAllRepository<OperatingSystemDto> {}
