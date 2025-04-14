import { VicepresidenciaName } from '../value-object/VicepresidenciaName'
import { VicepresidenciaEjecutivaId } from '@/core/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { type VicepresidenciaPrimitives } from '../dto/Vicepresidencia.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class Vicepresidencia {
	constructor(
		private readonly name: VicepresidenciaName,
		private readonly vicepresidenciaEjecutivaId: VicepresidenciaEjecutivaId
	) {}

	public static create(params: VicepresidenciaPrimitives): Vicepresidencia {
		return new Vicepresidencia(
			new VicepresidenciaName(params.name),
			new VicepresidenciaEjecutivaId(params.vicepresidenciaEjecutivaId)
		)
	}

	get nameValue(): Primitives<VicepresidenciaName> {
		return this.name.value
	}

	get vicepresidenciaEjecutivaValue(): Primitives<VicepresidenciaEjecutivaId> {
		return this.vicepresidenciaEjecutivaId.value
	}

	toPrimitives(): VicepresidenciaPrimitives {
		return {
			name: this.nameValue,
			vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaValue
		}
	}
}
