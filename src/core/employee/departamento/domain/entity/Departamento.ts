import { DepartamentoName } from '../value-object/DepartamentoName'
import { VicepresidenciaEjecutivaId } from '@/core/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { CentroCostoId } from '@/core/employee/centroCosto/domain/value-object/CentroCostoId'
import { CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DepartamentoPrimitives } from '../dto/Departamento.dto'

export class Departamento {
	constructor(
		private readonly name: DepartamentoName,
		private readonly vicepresidenciaEjecutivaId: VicepresidenciaEjecutivaId,
		private readonly centroCostoId: CentroCostoId,
		private readonly cargos: CargoId[]
	) {}

	public static create(params: DepartamentoPrimitives): Departamento {
		const cargos = params.cargos.map(cargo => new CargoId(cargo))
		return new Departamento(
			new DepartamentoName(params.name),
			new VicepresidenciaEjecutivaId(params.vicepresidenciaEjecutivaId),
			new CentroCostoId(params.centroCostoId),
			cargos
		)
	}

	get nameValue(): Primitives<DepartamentoName> {
		return this.name.value
	}

	get vicepresidenciaEjecutivaValue(): Primitives<VicepresidenciaEjecutivaId> {
		return this.vicepresidenciaEjecutivaId.value
	}

	get centroCostoValue(): Primitives<CentroCostoId> {
		return this.centroCostoId.value
	}

	get cargosValue(): Primitives<CargoId>[] {
		return this.cargos.map(c => c.value)
	}

	toPrimitives(): DepartamentoPrimitives {
		return {
			name: this.nameValue,
			vicepresidenciaEjecutivaId: this.vicepresidenciaEjecutivaValue,
			centroCostoId: this.centroCostoValue,
			cargos: this.cargosValue
		}
	}
}
