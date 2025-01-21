import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type SitePrimitives } from '../dto/Site.dto'
import { type SiteId } from '../value-object/SiteId'

export abstract class SiteSaveRepository extends SaveRepository<
	Primitives<SiteId>,
	SitePrimitives
> {}
