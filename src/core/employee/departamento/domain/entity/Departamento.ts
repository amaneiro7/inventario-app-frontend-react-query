import { DepartamentoName } from '../value-object/DepartamentoName'
import { VicepresidenciaId } from '@/core/employee/vicepresidencia/domain/value-object/VicepresidenciaId'
import { CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DepartamentoPrimitives } from '../dto/Departamento.dto'

export class Departamento {
	constructor(
		private readonly name: DepartamentoName,
		private readonly vicepresidenciaId: VicepresidenciaId,
		private readonly cargos: CargoId[]
	) {}

	public static create(params: DepartamentoPrimitives): Departamento {
		const cargos = params.cargos.map(cargo => new CargoId(cargo))
		return new Departamento(
			new DepartamentoName(params.name),
			new VicepresidenciaId(params.vicepresidenciaId),
			cargos
		)
	}

	get nameValue(): Primitives<DepartamentoName> {
		return this.name.value
	}

	get vicepresidenciaValue(): Primitives<VicepresidenciaId> {
		return this.vicepresidenciaId.value
	}

	get cargosValue(): Primitives<CargoId>[] {
		return this.cargos.map(c => c.value)
	}

	toPrimitives(): DepartamentoPrimitives {
		return {
			name: this.nameValue,
			vicepresidenciaId: this.vicepresidenciaValue,
			cargos: this.cargosValue
		}
	}
}
