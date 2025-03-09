import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CityId } from '../value-object/CityId'
import { type CityPrimitives } from '../dto/City.dto'

export abstract class CitySaveRepository extends SaveRepository<
	Primitives<CityId>,
	CityPrimitives
> {}
