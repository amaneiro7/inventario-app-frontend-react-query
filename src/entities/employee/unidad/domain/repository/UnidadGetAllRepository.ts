import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type UnidadDto } from '../dto/Unidad.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all Unidad entities.
 * It extends the generic `GetAllRepository` with `UnidadDto` as the type parameter.
 */
export abstract class UnidadGetAllRepository extends GetAllRepository<UnidadDto> {}
