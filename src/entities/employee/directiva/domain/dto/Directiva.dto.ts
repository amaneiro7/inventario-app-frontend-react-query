import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DirectivaId } from '../value-object/DirectivaId'
import { type DirectivaName } from '../value-object/DirectivaName'
import { type CargoId } from '@/entities/employee/cargo/domain/value-object/CargoId'
import { type Cargo } from '@/entities/employee/cargo/domain/dto/Cargo.dto'

export interface Directiva {
	id: Primitives<DirectivaId>
	name: Primitives<DirectivaName>
}

export type DirectivaPrimitives = Omit<Directiva, 'id'> & {
	cargos: Primitives<CargoId>[]
}

export type DirectivaParams = DirectivaPrimitives & {
	id?: Primitives<DirectivaId>
	cargos: Primitives<CargoId>[]
}

export type DirectivaDto = Directiva & {
	cargos: Cargo[]
	updatedAt: string
}
