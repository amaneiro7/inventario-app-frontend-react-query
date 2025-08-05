import { DepartamentoName } from '../value-object/DepartamentoName'
import { VicepresidenciaId } from '@/entities/employee/vicepresidencia/domain/value-object/VicepresidenciaId'
import { CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoPrimitives } from '../dto/Departamento.dto'

/**
 * Represents a Departamento entity in the domain. Encapsulates the name, associated vicepresidencia, and cargos.
 */
export class Departamento {
	/**
	 * Constructs a new Departamento instance.
	 * @param name - The name of the departamento.
	 * @param vicepresidenciaId - The ID of the vicepresidencia this departamento belongs to.
	 * @param cargos - An array of CargoId objects associated with this departamento.
	 */
	constructor(
		private readonly name: DepartamentoName,
		private readonly vicepresidenciaId: VicepresidenciaId,
		private readonly cargos: CargoId[]
	) {}

	/**
	 * Creates a new Departamento instance from primitive values.
	 * @param params - The primitive values for creating a Departamento.
	 * @returns A new Departamento instance.
	 */
	public static create(params: DepartamentoPrimitives): Departamento {
		return new Departamento(
			new DepartamentoName(params.name),
			new VicepresidenciaId(params.vicepresidenciaId),
			params.cargos.map(cargo => new CargoId(cargo))
		)
	}

	/**
	 * Gets the primitive value of the departamento name.
	 */
	get nameValue(): Primitives<DepartamentoName> {
		return this.name.value
	}

	/**
	 * Gets the primitive value of the associated vicepresidencia ID.
	 */
	get vicepresidenciaValue(): Primitives<VicepresidenciaId> {
		return this.vicepresidenciaId.value
	}

	/**
	 * Gets the primitive values of the associated cargo IDs.
	 */
	get cargosValue(): Primitives<CargoId>[] {
		return this.cargos.map(c => c.value)
	}

	/**
	 * Converts the Departamento entity to its primitive representation.
	 * @returns The primitive representation of the Departamento.
	 */
	toPrimitives(): DepartamentoPrimitives {
		return {
			name: this.nameValue,
			vicepresidenciaId: this.vicepresidenciaValue,
			cargos: this.cargosValue
		}
	}
}