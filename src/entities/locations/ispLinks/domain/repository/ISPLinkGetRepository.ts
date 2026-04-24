import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import type { ISPLinkId } from '../value-object/ISPLinkId'
import type { ISPLinkDto } from '../dto/ISPLink.dto'
import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'

export abstract class ISPLinkGetRepository extends GetRepository<
	Primitives<ISPLinkId>,
	ISPLinkDto
> {}
