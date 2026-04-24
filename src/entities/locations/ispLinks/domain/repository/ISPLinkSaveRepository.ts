import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import type { ISPLinkId } from '../value-object/ISPLinkId'
import type { ISPLinkPrimitives } from '../dto/ISPLink.dto'

export abstract class ISPLinkSaveRepository extends SaveRepository<
	Primitives<ISPLinkId>,
	ISPLinkPrimitives
> {}
