import { DirectivaId } from '@/entities/employee/directiva/domain/value-object/DirectivaId'
import { VicepresidenciaEjecutivaName } from '../value-object/VicepresidenciaEjecutivaName'
import { CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type VicepresidenciaEjecutivaPrimitives } from '../dto/VicepresidenciaEjecutiva.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * Represents a VicepresidenciaEjecutiva entity in the domain. Encapsulates the name, associated directiva, and cargos.
 */
export class VicepresidenciaEjecutiva {
	/**
	 * Constructs a new VicepresidenciaEjecutiva instance.
	 * @param name - The name of the vicepresidencia ejecutiva.
	 * @param directivaId - The ID of the directiva this vicepresidencia ejecutiva belongs to.
	 * @param cargos - An array of CargoId objects associated with this vicepresidencia ejecutiva.
	 */
	constructor(
		private readonly name: VicepresidenciaEjecutivaName,
		private readonly directivaId: DirectivaId,
		private readonly cargos: CargoId[]
	) {}

	/**
	 * Creates a new VicepresidenciaEjecutiva instance from primitive values.
	 * @param params - The primitive values for creating a VicepresidenciaEjecutiva.
	 * @returns A new VicepresidenciaEjecutiva instance.
	 */
	public static create(params: VicepresidenciaEjecutivaPrimitives): VicepresidenciaEjecutiva {
		return new VicepresidenciaEjecutiva(
			new VicepresidenciaEjecutivaName(params.name),
			new DirectivaId(params.directivaId),
			params.cargos.map(cargo => new CargoId(cargo))
		)
	}

	/**
	 * Gets the primitive value of the vicepresidencia ejecutiva name.
	 */
	get nameValue(): Primitives<VicepresidenciaEjecutivaName> {
		return this.name.value
	}

	/**
	 * Gets the primitive value of the associated directiva ID.
	 */
	get directivaValue(): Primitives<DirectivaId> {
		return this.directivaId.value
	}

	/**
	 * Gets the primitive values of the associated cargo IDs.
	 */
	get cargosValue(): Primitives<CargoId>[] {
		return this.cargos.map(c => c.value)
	}

	/**
	 * Converts the VicepresidenciaEjecutiva entity to its primitive representation.
	 * @returns The primitive representation of the VicepresidenciaEjecutiva.
	 */
	toPrimitives(): VicepresidenciaEjecutivaPrimitives {
		return {
			name: this.nameValue,
			directivaId: this.directivaValue,
			cargos: this.cargosValue
		}
	}
}