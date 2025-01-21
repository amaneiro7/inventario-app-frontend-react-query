import { DepartamentoId } from '@/core/employee/departamento/domain/value-object/DepartamentoId'
import { CargoName } from '../value-object/CargoName'
import { CargoPrimitives } from '../dto/Cargo.dto'
import { Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class Cargo {
	constructor(
		private readonly name: CargoName,
		private readonly departamentos: DepartamentoId[]
	) {}

	public static create(params: CargoPrimitives): Cargo {
		const departamentos = params.departamentos.map(
			deps => new DepartamentoId(deps)
		)
		return new Cargo(new CargoName(params.name), departamentos)
	}

	get nameValue(): Primitives<CargoName> {
		return this.name.value
	}

	get departamentosValue(): Primitives<DepartamentoId>[] {
		return this.departamentos.map(deps => deps.value)
	}

	toPrimitives(): CargoPrimitives {
		return {
			name: this.nameValue,
			departamentos: this.departamentosValue
		}
	}
}
