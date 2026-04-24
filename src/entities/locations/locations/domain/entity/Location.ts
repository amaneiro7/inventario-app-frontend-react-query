import { TypeOfSiteId } from '@/entities/locations/typeOfSites/domain/value-object/TypeOfSiteId'
import { LocationName } from '../value-object/LocationName'
import { SiteId } from '@/entities/locations/site/domain/value-object/SiteId'
import { LocationSubnet } from '../value-object/LocationSubnet'
import { LocationStatusId } from '@/entities/locations/locationStatus/domain/value-object/LocationStatusId'
import { AgencyClassification } from '../value-object/AgencyClassification'
import { type LocationPrimitives } from '../dto/Location.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { ISPLinkId } from '@/entities/locations/ispLinks/domain/value-object/ISPLinkId'

export class Location {
	constructor(
		private readonly name: LocationName,
		private readonly typeOfSiteId: TypeOfSiteId,
		private readonly siteId: SiteId,
		private readonly subnet: LocationSubnet,
		private readonly locationStatusId: LocationStatusId,
		private readonly agencyClassification: AgencyClassification,
		private readonly isplinks: ISPLinkId[]
	) {}

	public static create(params: LocationPrimitives): Location {
		return new Location(
			new LocationName(params.name),
			new TypeOfSiteId(params.typeOfSiteId),
			new SiteId(params.siteId),
			new LocationSubnet(params.subnet),
			new LocationStatusId(params.locationStatusId),
			new AgencyClassification(params.agencyClassification),
			params.isplinks.map(ispLink => new ISPLinkId(ispLink))
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

	get agencyClassificationValue(): Primitives<AgencyClassification> {
		return this.agencyClassification.value
	}

	get isplinksValue(): Primitives<ISPLinkId>[] {
		return this.isplinks.map(ispLink => ispLink.value)
	}

	toPrimitives(): LocationPrimitives {
		return {
			name: this.nameValue,
			typeOfSiteId: this.typeOfSiteValue,
			siteId: this.siteValue,
			subnet: this.subnetValue,
			locationStatusId: this.locationStatusValue,
			agencyClassification: this.agencyClassificationValue,
			isplinks: this.isplinksValue
		}
	}
}
