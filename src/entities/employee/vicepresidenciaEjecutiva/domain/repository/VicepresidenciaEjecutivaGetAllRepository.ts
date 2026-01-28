import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type VicepresidenciaEjecutivaDto } from '../dto/VicepresidenciaEjecutiva.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all VicepresidenciaEjecutiva entities.
 * It extends the generic `GetAllRepository` with `VicepresidenciaEjecutivaDto` as the type parameter.
 */
export abstract class VicepresidenciaEjecutivaGetAllRepository extends GetAllRepository<VicepresidenciaEjecutivaDto> {}
