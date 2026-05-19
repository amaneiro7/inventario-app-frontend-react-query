import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UnidadPrimitives } from '../dto/Unidad.dto'
import { UnidadName } from '../value-object/UnidadName'
import { CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { Level } from '../value-object/Level'
import { CentroDeCosto } from '../value-object/CentroDeCosto'
import { CodigoInterno } from '../value-object/CodigoInterno'
import { IsUnitActive } from '../value-object/IsUnitActive'
import { UnidadId } from '../value-object/UnidadId'

/**
 * Represents a Unidad entity in the domain. Encapsulates the name and associated cargos.
 */
export class Unidad {
	/**
	 * Constructs a new Unidad instance.
	 * @param name - The name of the Unidad.
	 * @param cargos - An array of CargoId objects associated with this Unidad.
	 */
	constructor(
		private readonly name: UnidadName,
		private level: Level,
		private centroDeCosto: CentroDeCosto,
		private codigoInterno: CodigoInterno,
		private isUnitActive: IsUnitActive,
		private parentId: UnidadId | null,
		private readonly cargos: CargoId[]
	) {}

	/**
	 * Creates a new Unidad instance from primitive values.
	 * @param params - The primitive values for creating a Unidad.
	 * @returns A new Unidad instance.
	 */
	public static create(params: UnidadPrimitives): Unidad {
		return new Unidad(
			new UnidadName(params.name),
			new Level(params.level),
			new CentroDeCosto(params.centroDeCosto),
			new CodigoInterno(params.codigoInterno),
			new IsUnitActive(params.isUnitActive),
			params.parentId ? new UnidadId(params.parentId) : null,
			params.cargos.map(cargo => new CargoId(cargo))
		)
	}

	/**
	 * Gets the primitive value of the Unidad name.
	 */
	get nameValue(): Primitives<UnidadName> {
		return this.name.value
	}

	/**
	 * Gets the primitive values of the associated cargo IDs.
	 */
	get cargosValue(): Primitives<CargoId>[] {
		return this.cargos.map(c => c.value)
	}
	get levelValue(): Primitives<Level> {
		return this.level.value
	}
	get centroDeCostoValue(): Primitives<CentroDeCosto> {
		return this.centroDeCosto.value
	}
	get codigoInternoValue(): Primitives<CodigoInterno> {
		return this.codigoInterno.value
	}
	get isUnitActiveValue(): Primitives<IsUnitActive> {
		return this.isUnitActive.value
	}
	get parentValue(): Primitives<UnidadId> | null {
		return this.parentId?.value || null
	}

	/**
	 * Converts the Unidad entity to its primitive representation.
	 * @returns The primitive representation of the Unidad.
	 */
	toPrimitives(): UnidadPrimitives {
		return {
			name: this.nameValue,
			level: this.levelValue,
			centroDeCosto: this.centroDeCostoValue,
			codigoInterno: this.codigoInternoValue,
			isUnitActive: this.isUnitActiveValue,
			parentId: this.parentValue,
			cargos: this.cargosValue
		}
	}
}
