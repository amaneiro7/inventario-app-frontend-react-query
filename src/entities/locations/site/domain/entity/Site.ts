import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type SitePrimitives } from '../dto/Site.dto'
import { CityId } from '@/entities/locations/city/domain/value-object/CityId'
import { SiteName } from '../value-object/SiteName'
import { SiteAddress } from '../value-object/SiteAddress'

export class Site {
	constructor(
		private readonly name: SiteName,
		private readonly cityId: CityId,
		private readonly address: SiteAddress
	) {}

	public static create(params: SitePrimitives): Site {
		return new Site(
			new SiteName(params.name),
			new CityId(params.cityId),
			new SiteAddress(params.address)
		)
	}

	get nameValue(): Primitives<SiteName> {
		return this.name.value
	}

	get cityValue(): Primitives<CityId> {
		return this.cityId.value
	}

	get addressValue(): Primitives<SiteAddress> {
		return this.address.value
	}

	toPrimitives(): SitePrimitives {
		return {
			name: this.nameValue,
			cityId: this.cityValue,
			address: this.addressValue
		}
	}
}
