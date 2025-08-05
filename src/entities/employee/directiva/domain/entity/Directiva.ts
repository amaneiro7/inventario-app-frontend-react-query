import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DirectivaPrimitives } from '../dto/Directiva.dto'
import { DirectivaName } from '../value-object/DirectivaName'
import { CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'

/**
 * Represents a Directiva entity in the domain. Encapsulates the name and associated cargos.
 */
export class Directiva {
	/**
	 * Constructs a new Directiva instance.
	 * @param name - The name of the directiva.
	 * @param cargos - An array of CargoId objects associated with this directiva.
	 */
	constructor(
		private readonly name: DirectivaName,
		private readonly cargos: CargoId[]
	) {}

	/**
	 * Creates a new Directiva instance from primitive values.
	 * @param params - The primitive values for creating a Directiva.
	 * @returns A new Directiva instance.
	 */
	public static create(params: DirectivaPrimitives): Directiva {
		return new Directiva(
			new DirectivaName(params.name),
			params.cargos.map(cargo => new CargoId(cargo))
		)
	}

	/**
	 * Gets the primitive value of the directiva name.
	 */
	get nameValue(): Primitives<DirectivaName> {
		return this.name.value
	}

	/**
	 * Gets the primitive values of the associated cargo IDs.
	 */
	get cargosValue(): Primitives<CargoId>[] {
		return this.cargos.map(c => c.value)
	}

	/**
	 * Converts the Directiva entity to its primitive representation.
	 * @returns The primitive representation of the Directiva.
	 */
	toPrimitives(): DirectivaPrimitives {
		return {
			name: this.nameValue,
			cargos: this.cargosValue
		}
	}
}