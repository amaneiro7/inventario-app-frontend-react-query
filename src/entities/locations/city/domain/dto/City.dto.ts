import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CityId } from '../value-object/CityId'
import { type CityName } from '../value-object/CityName'
import { type StateId } from '@/entities/locations/state/domain/value-object/StateId'
import { StateDto } from '@/entities/locations/state/domain/dto/State.dto'

export interface City {
	id: Primitives<CityId>
	name: Primitives<CityName>
	stateId: Primitives<StateId>
}

export type CityPrimitives = Omit<City, 'id'>

export type CityParams = CityPrimitives & {
	id?: Primitives<CityId> | undefined
}

export type CityDto = City & {
	state: StateDto
	updatedAt?: string
}
