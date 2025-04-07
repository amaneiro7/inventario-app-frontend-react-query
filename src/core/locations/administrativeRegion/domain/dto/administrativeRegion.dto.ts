import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type AdministrativeRegionId } from '../value-object/AdministrativeRegionId'
import { type AdministrativeRegionName } from '../value-object/AdministrativeRegionName'

export interface AdministrativeRegion {
	id: Primitives<AdministrativeRegionId>
	name: Primitives<AdministrativeRegionName>
}

export type AdministrativeRegionPrimitives = Omit<AdministrativeRegion, 'id'>

export type AdministrativeRegionDto = AdministrativeRegion
