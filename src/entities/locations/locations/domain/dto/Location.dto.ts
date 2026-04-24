import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import type { LocationId } from '../value-object/LocationId'
import type { LocationName } from '../value-object/LocationName'
import type { TypeOfSiteId } from '@/entities/locations/typeOfSites/domain/value-object/TypeOfSiteId'
import type { SiteId } from '@/entities/locations/site/domain/value-object/SiteId'
import type { LocationSubnet } from '../value-object/LocationSubnet'
import type { TypeOfSiteDto } from '@/entities/locations/typeOfSites/domain/dto/TypeOfSites.dto'
import type { SiteDto } from '@/entities/locations/site/domain/dto/Site.dto'
import type { LocationStatusId } from '@/entities/locations/locationStatus/domain/value-object/LocationStatusId'
import type { LocationStatusDto } from '@/entities/locations/locationStatus/domain/dto/LocationStatus.dto'
import type { AgencyClassification } from '../value-object/AgencyClassification'
import type { ISPLinkId } from '@/entities/locations/ispLinks/domain/value-object/ISPLinkId'
import type { ISPLinkDto } from '@/entities/locations/ispLinks/domain/dto/ISPLink.dto'

export interface Location {
	id: Primitives<LocationId>
	name: Primitives<LocationName>
	typeOfSiteId: Primitives<TypeOfSiteId>
	siteId: Primitives<SiteId>
	subnet: Primitives<LocationSubnet>
	locationStatusId: Primitives<LocationStatusId>
	agencyClassification: Primitives<AgencyClassification>
}

export type LocationParams = LocationPrimitives & {
	id?: Primitives<LocationId> | undefined
	isplinks: Primitives<ISPLinkId>[]
}

export type LocationPrimitives = Omit<Location, 'id'> & {
	isplinks: Primitives<ISPLinkId>[]
}

export type LocationDto = Location & {
	typeOfSite: TypeOfSiteDto
	site: SiteDto
	locationStatus: LocationStatusDto
	ispLinks: ISPLinkDto[]
	createdAt: string
	updatedAt: string
}
