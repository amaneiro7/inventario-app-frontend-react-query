import { TypeOfSiteId } from '@/core/locations/typeOfSites/domain/value-object/TypeOfSiteId'
import { LocationName } from '../value-object/LocationName'
import { SiteId } from '@/core/locations/site/domain/value-object/SiteId'
import { Subnet } from '../value-object/LocationSubnet'
import { type LocationPrimitives } from '../dto/Location.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class Location {
	constructor(
		private readonly name: LocationName,
		private readonly typeOfSiteId: TypeOfSiteId,
		private readonly siteId: SiteId,
		private readonly subnet: Subnet
	) {}

	public static create(params: LocationPrimitives): Location {
		return new Location(
			new LocationName(params.name),
			new TypeOfSiteId(params.typeOfSiteId),
			new SiteId(params.siteId),
			new Subnet(params.subnet)
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

	get subnetValue(): Primitives<Subnet> {
		return this.subnet.value
	}

	toPrimitives(): LocationPrimitives {
		return {
			name: this.nameValue,
			typeOfSiteId: this.typeOfSiteValue,
			siteId: this.siteValue,
			subnet: this.subnetValue
		}
	}
}
