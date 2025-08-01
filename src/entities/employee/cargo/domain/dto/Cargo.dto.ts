import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CargoId } from '../value-object/CargoId'
import { type CargoName } from '../value-object/CargoName'
import { type DepartamentoId } from '@/entities/employee/departamento/domain/value-object/DepartamentoId'
import { type Departamento } from '@/entities/employee/departamento/domain/dto/Departamento.dto'

export interface Cargo {
	id: Primitives<CargoId>
	name: Primitives<CargoName>
}

export type CargoPrimitives = Omit<Cargo, 'id'> & {
	departamentos: Primitives<DepartamentoId>[]
}

export type CargoParams = CargoPrimitives & {
	id?: Primitives<CargoId>
	departamentos: Primitives<DepartamentoId>[]
}

export type CargoDto = Cargo & {
	departamentos: Departamento[]
	updatedAt: string
}
