import { TypeOfSiteId } from '@/core/locations/typeOfSites/domain/value-object/TypeOfSiteId'
import { LocationName } from '../value-object/LocationName'
import { SiteId } from '@/core/locations/site/domain/value-object/SiteId'
import { LocationSubnet } from '../value-object/LocationSubnet'
import { LocationStatusId } from '@/core/locations/locationStatus/domain/value-object/LocationStatusId'
import { type LocationPrimitives } from '../dto/Location.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class Location {
	constructor(
		private readonly name: LocationName,
		private readonly typeOfSiteId: TypeOfSiteId,
		private readonly siteId: SiteId,
		private readonly subnet: LocationSubnet,
		private readonly locationStatusId: LocationStatusId
	) {}

	public static create(params: LocationPrimitives): Location {
		return new Location(
			new LocationName(params.name),
			new TypeOfSiteId(params.typeOfSiteId),
			new SiteId(params.siteId),
			new LocationSubnet(params.subnet),
			new LocationStatusId(params.locationStatusId)
		)
	}
	get nameValue(): Primitives<LocationName> {
		return this.name.value
	}

	get typeOfSiteValue(): Primitives<TypeOfSiteId> {
		return this.typeOfSiteId.value
	}

	get siteValue(): Primitives<SiteId> {
		return this.siteId.value
	}
	get locationStatusValue(): Primitives<LocationStatusId> {
		return this.locationStatusId.value
	}

	get subnetValue(): Primitives<LocationSubnet> {
		return this.subnet.value
	}

	toPrimitives(): LocationPrimitives {
		return {
			name: this.nameValue,
			typeOfSiteId: this.typeOfSiteValue,
			siteId: this.siteValue,
			subnet: this.subnetValue,
			locationStatusId: this.locationStatusValue
		}
	}
}
