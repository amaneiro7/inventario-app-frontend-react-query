import { CityName } from '../value-object/CityName'
import { StateId } from '@/core/locations/state/domain/value-object/StateId'
import { type CityPrimitives } from '../dto/City.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class City {
	constructor(private readonly name: CityName, private readonly stateId: StateId) {}

	static create({ name, stateId }: CityPrimitives): City {
		return new City(new CityName(name), new StateId(stateId))
	}

	get nameValue(): Primitives<CityName> {
		return this.name.value
	}
	get stateValue(): Primitives<StateId> {
		return this.stateId.value
	}

	toPrimitives(): CityPrimitives {
		return {
			name: this.name.value,
			stateId: this.stateId.value
		}
	}
}
