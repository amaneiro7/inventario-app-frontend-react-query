import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type StateId } from '../value-object/StateId'
import { type StateName } from '../value-object/StateName'
import { type RegionId } from '@/entities/locations/region/domain/value-object/RegionId'
import { type RegionDto } from '@/entities/locations/region/domain/dto/region.dto'

interface State {
	id: Primitives<StateId>
	name: Primitives<StateName>
	regionId: Primitives<RegionId>
}

export type StateDto = State & {
	region: RegionDto
}
