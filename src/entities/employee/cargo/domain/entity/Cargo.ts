import { DepartamentoId } from '@/entities/employee/departamento/domain/value-object/DepartamentoId'
import { CargoName } from '../value-object/CargoName'
import { type CargoPrimitives } from '../dto/Cargo.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Represents a Cargo entity in the domain. Encapsulates the name and associated departments.
 */
export class Cargo {
	/**
	 * Constructs a new Cargo instance.
	 * @param name - The name of the cargo.
	 * @param departamentos - An array of DepartamentoId objects associated with this cargo.
	 */
	constructor(
		private readonly name: CargoName,
		private readonly departamentos: DepartamentoId[]
	) {}

	/**
	 * Creates a new Cargo instance from primitive values.
	 * @param params - The primitive values for creating a Cargo.
	 * @returns A new Cargo instance.
	 */
	public static create(params: CargoPrimitives): Cargo {
		const departamentos = params.departamentos.map(deps => new DepartamentoId(deps))
		return new Cargo(new CargoName(params.name), departamentos)
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
	get departamentosValue(): Primitives<DepartamentoId>[] {
		return this.departamentos.map(deps => deps.value)
	}

	/**
	 * Converts the Cargo entity to its primitive representation.
	 * @returns The primitive representation of the Cargo.
	 */
	toPrimitives(): CargoPrimitives {
		return {
			name: this.nameValue,
			departamentos: this.departamentosValue
		}
	}
}