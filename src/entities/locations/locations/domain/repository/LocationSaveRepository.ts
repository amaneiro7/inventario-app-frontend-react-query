import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type LocationPrimitives } from '../dto/Location.dto'
import { type LocationId } from '../value-object/LocationId'

export abstract class LocationSaveRepository extends SaveRepository<
	Primitives<LocationId>,
	LocationPrimitives
> {}
