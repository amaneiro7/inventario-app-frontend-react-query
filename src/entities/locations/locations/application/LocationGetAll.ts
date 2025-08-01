import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type LocationDto } from '../domain/dto/Location.dto'

export class LocationGetAll extends GetAllBaseService<LocationDto> {}
