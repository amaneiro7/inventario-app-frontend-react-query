import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type LocationId } from '../value-object/LocationId'
import { type LocationName } from '../value-object/LocationName'
import { type TypeOfSiteId } from '@/core/locations/typeOfSites/domain/value-object/TypeOfSiteId'
import { type SiteId } from '@/core/locations/site/domain/value-object/SiteId'
import { type LocationSubnet } from '../value-object/LocationSubnet'
import { type TypeOfSiteDto } from '@/core/locations/typeOfSites/domain/dto/TypeOfSites.dto'
import { type SiteDto } from '@/core/locations/site/domain/dto/Site.dto'
import { type LocationStatusId } from '@/core/locations/locationStatus/domain/value-object/LocationStatusId'
import { type LocationStatusDto } from '@/core/locations/locationStatus/domain/dto/LocationStatus.dto'

export interface Location {
	id: Primitives<LocationId>
	name: Primitives<LocationName>
	typeOfSiteId: Primitives<TypeOfSiteId>
	siteId: Primitives<SiteId>
	subnet: Primitives<LocationSubnet>
	locationStatusId: Primitives<LocationStatusId>
}

export type LocationPrimitives = Omit<Location, 'id'>

export type LocationParams = LocationPrimitives & {
	id?: Primitives<LocationId> | undefined
}

export type LocationDto = Location & {
	typeOfSite: TypeOfSiteDto
	site: SiteDto
	locationStatus: LocationStatusDto
	createdAt: string
	updatedAt: string
}
