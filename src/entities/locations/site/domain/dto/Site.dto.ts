import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type SiteId } from '../value-object/SiteId'
import { type SiteName } from '../value-object/SiteName'
import { type CityId } from '@/entities/locations/city/domain/value-object/CityId'
import { type SiteAddress } from '../value-object/SiteAddress'
import { type CityDto } from '@/entities/locations/city/domain/dto/City.dto'

export interface Site {
	id: Primitives<SiteId>
	name: Primitives<SiteName>
	cityId: Primitives<CityId>
	address: Primitives<SiteAddress>
}

export type SitePrimitives = Omit<Site, 'id'>

export type SiteParams = SitePrimitives & {
	id?: Primitives<SiteId> | undefined
}

export type SiteDto = Site & {
	city: CityDto
	updatedAt?: string
}
