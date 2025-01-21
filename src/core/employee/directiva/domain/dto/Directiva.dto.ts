import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DirectivaId } from '../value-object/DirectivaId'
import { type DirectivaName } from '../value-object/DirectivaName'

export interface Directiva {
	id: Primitives<DirectivaId>
	name: Primitives<DirectivaName>
}

export type DirectivaPrimitives = Omit<Directiva, 'id'>

export type DirectivaDto = Directiva
