import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type RegionId } from '../value-object/RegionId'
import { type RegionName } from '../value-object/RegionName'

export interface Region {
	id: Primitives<RegionId>
	name: Primitives<RegionName>
}

export type RegionPrimitives = Omit<Region, 'id'>

export type RegionDTO = Region
