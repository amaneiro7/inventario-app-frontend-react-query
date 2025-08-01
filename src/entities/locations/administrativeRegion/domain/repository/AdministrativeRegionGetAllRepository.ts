import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type AdministrativeRegionDto } from '../dto/administrativeRegion.dto'

export abstract class AdministrativeRegionGetAllRepository extends GetAllRepository<AdministrativeRegionDto> {}
