import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DirectivaDto } from '../domain/dto/Directiva.dto'
import { type DirectivaId } from '../domain/value-object/DirectivaId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * Service class for retrieving a single Directiva entity by its ID.
 * It extends GetBaseService, providing generic functionality for fetching a single record
 * of type DirectivaDto using a DirectivaId primitive as the identifier.
 */
export class DirectivaGetter extends GetBaseService<Primitives<DirectivaId>, DirectivaDto> {}
