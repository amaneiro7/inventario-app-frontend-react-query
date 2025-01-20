import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type LocationId } from '../value-object/LocationId'
import { type LocationDto } from '../dto/Location.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export abstract class LocationGetRepository extends GetRepository<
  Primitives<LocationId>,
  LocationDto
> {}
