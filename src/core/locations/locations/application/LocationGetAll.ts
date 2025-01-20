import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type LocationDto } from '../domain/dto/Location.dto'

export class LocationGetAll extends GetAllBaseService<LocationDto> {}
