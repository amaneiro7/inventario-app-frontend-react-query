import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type StateId } from '../value-object/StateId'
import { type StateName } from '../value-object/StateName'
import { type RegionId } from '@/core/locations/region/domain/value-object/RegionId'
import { type RegionDTO } from '@/core/locations/region/domain/dto/region.dto'

export interface State {
  id: Primitives<StateId>
  name: Primitives<StateName>
  regionId: Primitives<RegionId>
}

export type StatePrimitves = Omit<State, 'id'>

export type StateDto = State & {
  region: RegionDTO
}
