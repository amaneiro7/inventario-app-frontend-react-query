import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type RegionId } from '../value-object/RegionId'
import { type RegionName } from '../value-object/RegionName'
import { type AdministrativeRegionId } from '@/core/locations/administrativeRegion/domain/value-object/AdministrativeRegionId'
import { type AdministrativeRegionDto } from '@/core/locations/administrativeRegion/domain/dto/administrativeRegion.dto'

export interface Region {
	id: Primitives<RegionId>
	name: Primitives<RegionName>
	administrativeRegionId: Primitives<AdministrativeRegionId>
}

export type RegionPrimitives = Omit<Region, 'id'>

export type RegionParams = RegionPrimitives & {
	id?: Primitives<RegionId>
}

export type RegionDto = Region & {
	administratveRegion: AdministrativeRegionDto
}
