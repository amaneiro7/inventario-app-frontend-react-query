import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DirectivaPrimitives } from '../dto/Directiva.dto'
import { type DirectivaId } from '../value-object/DirectivaId'

export abstract class DirectivaSaveRepository extends SaveRepository<
	Primitives<DirectivaId>,
	DirectivaPrimitives
> {}
