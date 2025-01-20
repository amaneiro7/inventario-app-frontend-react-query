import { type LocationDto } from '../domain/dto/Location.dto'
import { type LocationId } from '../domain/value-object/LocationId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class LocationGetter extends GetBaseService<LocationId, LocationDto> {}
