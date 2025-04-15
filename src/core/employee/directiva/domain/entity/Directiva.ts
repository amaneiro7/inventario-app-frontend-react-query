import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DirectivaPrimitives } from '../dto/Directiva.dto'
import { DirectivaName } from '../value-object/DirectivaName'
import { CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'

export class Directiva {
	constructor(private readonly name: DirectivaName, private readonly cargos: CargoId[]) {}

	public static create(params: DirectivaPrimitives): Directiva {
		return new Directiva(
			new DirectivaName(params.name),
			params.cargos.map(cargo => new CargoId(cargo))
		)
	}

	get nameValue(): Primitives<DirectivaName> {
		return this.name.value
	}

	get cargosValue(): Primitives<CargoId>[] {
		return this.cargos.map(c => c.value)
	}

	toPrimitives(): DirectivaPrimitives {
		return {
			name: this.nameValue,
			cargos: this.cargosValue
		}
	}
}
