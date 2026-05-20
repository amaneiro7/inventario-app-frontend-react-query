import { CargoName } from '../value-object/CargoName'
import { UnidadId } from '@/entities/employee/unidad/domain/value-object/UnidadId'
import { type CargoPrimitives } from '../dto/Cargo.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Represents a Cargo entity in the domain. Encapsulates the name and associated units.
 */
export class Cargo {
	/**
	 * Constructs a new Cargo instance.
	 * @param name - The name of the cargo.
	 * @param unidades - An array of UnidadId objects associated with this cargo.
	 */
	constructor(
		private readonly name: CargoName,
		private readonly unidades: UnidadId[]
	) {}

	/**
	 * Creates a new Cargo instance from primitive values.
	 * @param params - The primitive values for creating a Cargo.
	 * @returns A new Cargo instance.
	 */
	public static create(params: CargoPrimitives): Cargo {
		const unidades = params.unidades.map(deps => new UnidadId(deps))
		return new Cargo(new CargoName(params.name), unidades)
	}

	/**
	 * Gets the primitive value of the cargo name.
	 */
	get nameValue(): Primitives<CargoName> {
		return this.name.value
	}

	/**
	 * Gets the primitive values of the associated department IDs.
	 */
	get unidadesValue(): Primitives<UnidadId>[] {
		return this.unidades.map(deps => deps.value)
	}

	/**
	 * Converts the Cargo entity to its primitive representation.
	 * @returns The primitive representation of the Cargo.
	 */
	toPrimitives(): CargoPrimitives {
		return {
			name: this.nameValue,
			unidades: this.unidadesValue
		}
	}
}
