import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CityId } from '../value-object/CityId'
import { type CityName } from '../value-object/CityName'
import { type StateId } from '@/core/locations/state/domain/value-object/StateId'
import { StateDto } from '@/core/locations/state/domain/dto/State.dto'

export interface City {
	id: Primitives<CityId>
	name: Primitives<CityName>
	stateId: Primitives<StateId>
}

export type CityPrimitives = Omit<City, 'id'>

export type CityDto = City & {
	state: StateDto
}
