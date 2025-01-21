import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type LocationId } from '../value-object/LocationId'
import { type LocationName } from '../value-object/LocationName'
import { type TypeOfSiteId } from '@/core/locations/typeOfSites/domain/value-object/TypeOfSiteId'
import { type SiteId } from '@/core/locations/site/domain/value-object/SiteId'
import { type Subnet } from '../value-object/LocationSubnet'
import { type TypeOfSiteDto } from '@/core/locations/typeOfSites/domain/dto/TypeOFSite.dto'
import { type SiteDto } from '@/core/locations/site/domain/dto/Site.dto'

export interface Location {
	id: Primitives<LocationId>
	name: Primitives<LocationName>
	typeOfSiteId: Primitives<TypeOfSiteId>
	siteId: Primitives<SiteId>
	subnet: Primitives<Subnet>
}

export type LocationPrimitives = Omit<Location, 'id'>

export type LocationDto = Location & {
	typeOtSite: TypeOfSiteDto
	site: SiteDto
}
