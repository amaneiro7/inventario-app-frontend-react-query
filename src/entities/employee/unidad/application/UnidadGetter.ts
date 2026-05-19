import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UnidadDto } from '../domain/dto/Unidad.dto'
import { type UnidadId } from '../domain/value-object/UnidadId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * Service class for retrieving a single Unidad entity by its ID.
 * It extends GetBaseService, providing generic functionality for fetching a single record
 * of type UnidadDto using a UnidadId primitive as the identifier.
 */
export class UnidadGetter extends GetBaseService<Primitives<UnidadId>, UnidadDto> {}
