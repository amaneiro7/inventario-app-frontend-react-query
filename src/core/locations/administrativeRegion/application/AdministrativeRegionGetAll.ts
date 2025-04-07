import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type AdministrativeRegionDto } from '../domain/dto/administrativeRegion.dto'

export class AdministrativeRegionGetAll extends GetAllBaseService<AdministrativeRegionDto> {}
