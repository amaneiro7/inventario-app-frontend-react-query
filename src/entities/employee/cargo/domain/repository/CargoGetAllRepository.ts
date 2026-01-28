import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type CargoDto } from '../dto/Cargo.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all Cargo entities.
 * It extends the generic `GetAllRepository` with `CargoDto` as the type parameter.
 */
export abstract class CargoGetAllRepository extends GetAllRepository<CargoDto> {}
