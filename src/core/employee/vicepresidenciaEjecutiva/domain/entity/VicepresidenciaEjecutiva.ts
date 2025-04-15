import { DirectivaId } from '@/core/employee/directiva/domain/value-object/DirectivaId'
import { VicepresidenciaEjecutivaName } from '../value-object/VicepresidenciaEjecutivaName'
import { CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { type VicepresidenciaEjecutivaPrimitives } from '../dto/VicepresidenciaEjecutiva.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class VicepresidenciaEjecutiva {
	constructor(
		private readonly name: VicepresidenciaEjecutivaName,
		private readonly directivaId: DirectivaId,
		private readonly cargos: CargoId[]
	) {}

	public static create(params: VicepresidenciaEjecutivaPrimitives): VicepresidenciaEjecutiva {
		return new VicepresidenciaEjecutiva(
			new VicepresidenciaEjecutivaName(params.name),
			new DirectivaId(params.directivaId),
			params.cargos.map(cargo => new CargoId(cargo))
		)
	}

	get nameValue(): Primitives<VicepresidenciaEjecutivaName> {
		return this.name.value
	}

	get directivaValue(): Primitives<DirectivaId> {
		return this.directivaId.value
	}

	get cargosValue(): Primitives<CargoId>[] {
		return this.cargos.map(c => c.value)
	}

	toPrimitives(): VicepresidenciaEjecutivaPrimitives {
		return {
			name: this.nameValue,
			directivaId: this.directivaValue,
			cargos: this.cargosValue
		}
	}
}
