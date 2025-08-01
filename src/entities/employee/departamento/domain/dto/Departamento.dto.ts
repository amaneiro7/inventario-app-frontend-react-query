import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoId } from '../value-object/DepartamentoId'
import { type DepartamentoName } from '../value-object/DepartamentoName'
import { type VicepresidenciaId } from '@/entities/employee/vicepresidencia/domain/value-object/VicepresidenciaId'
import { type VicepresidenciaDto } from '@/entities/employee/vicepresidencia/domain/dto/Vicepresidencia.dto'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type Cargo } from '@/entities/employee/cargo/domain/dto/Cargo.dto'

export interface Departamento {
	id: Primitives<DepartamentoId>
	name: Primitives<DepartamentoName>
	vicepresidenciaId: Primitives<VicepresidenciaId>
}

export type DepartamentoParams = DepartamentoPrimitives & {
	id?: Primitives<DepartamentoId>
	cargos: Primitives<CargoId>[]
}
export type DepartamentoPrimitives = Omit<Departamento, 'id'> & {
	cargos: Primitives<CargoId>[]
}

export type DepartamentoDto = Departamento & {
	vicepresidencia: VicepresidenciaDto
	cargos: Cargo[]
	updatedAt: string
}
