import { type DirectivaDto } from '../domain/dto/Directiva.dto'
import { type DirectivaId } from '../domain/value-object/DirectivaId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class DirectivaGetter extends GetBaseService<DirectivaId, DirectivaDto> {}
