import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CityId } from '../value-object/CityId'
import { type CityName } from '../value-object/CityName'

export interface CityDTO {
  id: Primitives<CityId>
  name: Primitives<CityName>
  stateId: Primitives<StateId>
}
