import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CentroTrabajoPrimitives } from '../dto/CentroTrabajo.dto'
import { CentroTrabajoId } from '../value-object/CentroTrabajoId'
import { CentroTrabajoName } from '../value-object/CentroTrabajoName'
import { CentroCostoId } from '@/entities/employee/centroCosto/domain/value-object/CentroCostoId'

export class CentroTrabajo {
	constructor(
		private readonly id: CentroTrabajoId,
		private readonly name: CentroTrabajoName,
		private readonly centroCostoId: CentroTrabajoId
	) {}

	public static create(params: CentroTrabajoPrimitives): CentroTrabajo {
		return new CentroTrabajo(
			new CentroTrabajoId(params.id),
			new CentroTrabajoName(params.name),
			new CentroCostoId(params.centroCostoId)
		)
	}

	get idValue(): Primitives<CentroTrabajoId> {
		return this.id.value
	}

	get nameValue(): Primitives<CentroTrabajoName> {
		return this.name.value
	}

	get centroCostoValue(): Primitives<CentroTrabajoId> {
		return this.centroCostoId.value
	}

	toPrimitives(): CentroTrabajoPrimitives {
		return {
			id: this.idValue,
			name: this.nameValue,
			centroCostoId: this.centroCostoValue
		}
	}
}
