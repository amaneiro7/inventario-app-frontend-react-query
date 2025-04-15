import { VicepresidenciaName } from '../value-object/VicepresidenciaName'
import { VicepresidenciaEjecutivaId } from '@/core/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { type VicepresidenciaPrimitives } from '../dto/Vicepresidencia.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class Vicepresidencia {
	constructor(
		private readonly name: VicepresidenciaName,
		private readonly vicepresidenciaEjecutivaId: VicepresidenciaEjecutivaId,
		private readonly cargos: CargoId[]
	) {}

	public static create(params: VicepresidenciaPrimitives): Vicepresidencia {
		return new Vicepresidencia(
			new VicepresidenciaName(params.name),
			new VicepresidenciaEjecutivaId(params.vicepresidenciaEjecutivaId),
			params.cargos.map(cargo => new CargoId(cargo))
		)
	}

	get nameValue(): Primitives<VicepresidenciaName> {
		return this.name.value
	}

	get vicepresidenciaEjecutivaValue(): Primitives<VicepresidenciaEjecutivaId> {
		return this.vicepresidenciaEjecutivaId.value
	}

	get cargosValue(): Primitives<CargoId>[] {
		return this.cargos.map(c => c.value)
	}

	toPrimitives(): VicepresidenciaPrimitives {
		return {
			name: this.nameValue,
			vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaValue,
			cargos: this.cargosValue
		}
	}
}
