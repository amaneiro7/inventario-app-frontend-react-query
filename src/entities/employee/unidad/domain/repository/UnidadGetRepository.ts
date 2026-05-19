import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type UnidadDto } from '../dto/Unidad.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UnidadId } from '../value-object/UnidadId'

/**
 * Abstract class for a repository that provides methods for retrieving a single Unidad entity.
 * It extends the generic `GetRepository` with `Primitives<UnidadId>` as the ID type and `UnidadDto` as the entity type.
 */
export abstract class UnidadGetRepository extends GetRepository<Primitives<UnidadId>, UnidadDto> {}
