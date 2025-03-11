import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DepartamentoId } from '../value-object/DepartamentoId'
import { type DepartamentoName } from '../value-object/DepartamentoName'
import { type VicepresidenciaEjecutivaId } from '@/core/employee/vicepresidenciaEjecutiva/domain/value-object/VicepresidenciaEjecutivaId'
import { type CentroCostoId } from '@/core/employee/centroCosto/domain/value-object/CentroCostoId'
import { type VicepresidenciaEjecutivaDto } from '@/core/employee/vicepresidenciaEjecutiva/domain/dto/VicepresidenciaEjecutiva.dto'
import { type CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { type CentroCostoDto } from '@/core/employee/centroCosto/domain/dto/CentroCosto.dto'
import { type Cargo } from '@/core/employee/cargo/domain/dto/Cargo.dto'

export interface Departamento {
	id: Primitives<DepartamentoId>
	name: Primitives<DepartamentoName>
	vicepresidenciaEjecutivaId: Primitives<VicepresidenciaEjecutivaId>
	centroCostoId: Primitives<CentroCostoId>
}

export type DepartamentoParams = DepartamentoPrimitives & {
	id?: Primitives<DepartamentoId>
	cargos: Primitives<CargoId>[]
}
export type DepartamentoPrimitives = Omit<Departamento, 'id'> & {
	cargos: Primitives<CargoId>[]
}

export type DepartamentoDto = Departamento & {
	vicepresidenciaEjecutiva: VicepresidenciaEjecutivaDto
	centroCosto: CentroCostoDto
	cargos: Cargo[]
	updatedAt: string
}
