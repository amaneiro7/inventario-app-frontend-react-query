import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type SiteId } from '../value-object/SiteId'
import { type SiteDto } from '../dto/Site.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export abstract class SiteGetRepository extends GetRepository<
	Primitives<SiteId>,
	SiteDto
> {}
