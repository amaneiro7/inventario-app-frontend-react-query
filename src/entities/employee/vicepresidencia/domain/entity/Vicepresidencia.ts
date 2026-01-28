import { VicepresidenciaName } from '../value-object/VicepresidenciaName'
import { VicepresidenciaEjecutivaId } from '@/entities/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type VicepresidenciaPrimitives } from '../dto/Vicepresidencia.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Represents a Vicepresidencia entity in the domain. Encapsulates the name, associated executive vicepresidencia, and cargos.
 */
export class Vicepresidencia {
	/**
	 * Constructs a new Vicepresidencia instance.
	 * @param name - The name of the vicepresidencia.
	 * @param vicepresidenciaEjecutivaId - The ID of the executive vicepresidencia this vicepresidencia belongs to.
	 * @param cargos - An array of CargoId objects associated with this vicepresidencia.
	 */
	constructor(
		private readonly name: VicepresidenciaName,
		private readonly vicepresidenciaEjecutivaId: VicepresidenciaEjecutivaId,
		private readonly cargos: CargoId[]
	) {}

	/**
	 * Creates a new Vicepresidencia instance from primitive values.
	 * @param params - The primitive values for creating a Vicepresidencia.
	 * @returns A new Vicepresidencia instance.
	 */
	public static create(params: VicepresidenciaPrimitives): Vicepresidencia {
		return new Vicepresidencia(
			new VicepresidenciaName(params.name),
			new VicepresidenciaEjecutivaId(params.vicepresidenciaEjecutivaId),
			params.cargos.map(cargo => new CargoId(cargo))
		)
	}

	/**
	 * Gets the primitive value of the vicepresidencia name.
	 */
	get nameValue(): Primitives<VicepresidenciaName> {
		return this.name.value
	}

	/**
	 * Gets the primitive value of the associated executive vicepresidencia ID.
	 */
	get vicepresidenciaEjecutivaValue(): Primitives<VicepresidenciaEjecutivaId> {
		return this.vicepresidenciaEjecutivaId.value
	}

	/**
	 * Gets the primitive values of the associated cargo IDs.
	 */
	get cargosValue(): Primitives<CargoId>[] {
		return this.cargos.map(c => c.value)
	}

	/**
	 * Converts the Vicepresidencia entity to its primitive representation.
	 * @returns The primitive representation of the Vicepresidencia.
	 */
	toPrimitives(): VicepresidenciaPrimitives {
		return {
			name: this.nameValue,
			vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaValue,
			cargos: this.cargosValue
		}
	}
}
