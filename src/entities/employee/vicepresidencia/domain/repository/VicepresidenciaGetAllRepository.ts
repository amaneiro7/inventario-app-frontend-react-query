import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type VicepresidenciaDto } from '../dto/Vicepresidencia.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all Vicepresidencia entities.
 * It extends the generic `GetAllRepository` with `VicepresidenciaDto` as the type parameter.
 */
export abstract class VicepresidenciaGetAllRepository extends GetAllRepository<VicepresidenciaDto> {}