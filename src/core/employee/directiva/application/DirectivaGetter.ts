import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DirectivaDto } from '../domain/dto/Directiva.dto'
import { type DirectivaId } from '../domain/value-object/DirectivaId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class DirectivaGetter extends GetBaseService<Primitives<DirectivaId>, DirectivaDto> {}
