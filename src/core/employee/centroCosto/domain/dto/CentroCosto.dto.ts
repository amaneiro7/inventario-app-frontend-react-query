import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CentroCostoId } from '../value-object/CentroCostoId'
import { type CentroCostoName } from '../value-object/CentroCostoName'

export interface CentroCosto {
	id: Primitives<CentroCostoId>
	name: Primitives<CentroCostoName>
}

export type CentroCostoPrimitives = CentroCosto

export type CentroCostoDto = CentroCosto
