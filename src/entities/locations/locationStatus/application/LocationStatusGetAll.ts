import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type LocationStatusDto } from '../domain/dto/LocationStatus.dto'

export class LocationStatusGetAll extends GetAllBaseService<LocationStatusDto> {}
