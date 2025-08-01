import { RegionName } from '../value-object/RegionName'
import { AdministrativeRegionId } from '@/entities/locations/administrativeRegion/domain/value-object/AdministrativeRegionId'
import { type RegionPrimitives } from '../dto/region.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export class Region {
	constructor(
		private readonly name: RegionName,
		private readonly administrativeRegionId: AdministrativeRegionId
	) {}

	static create({ name, administrativeRegionId }: RegionPrimitives): Region {
		return new Region(new RegionName(name), new AdministrativeRegionId(administrativeRegionId))
	}

	get nameValue(): Primitives<RegionName> {
		return this.name.value
	}
	get administrativeRegionValue(): Primitives<AdministrativeRegionId> {
		return this.administrativeRegionId.value
	}

	toPrimitives(): RegionPrimitives {
		return {
			name: this.nameValue,
			administrativeRegionId: this.administrativeRegionValue
		}
	}
}
