import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import type { ISPLinkId } from '../domain/value-object/ISPLinkId'
import type { ISPLinkDto } from '../domain/dto/ISPLink.dto'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

export class ISPLinkGetter extends GetBaseService<Primitives<ISPLinkId>, ISPLinkDto> {}
