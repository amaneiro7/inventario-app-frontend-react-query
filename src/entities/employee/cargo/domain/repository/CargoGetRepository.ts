import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type CargoDto } from '../dto/Cargo.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CargoId } from '../value-object/CargoId'

/**
 * Abstract class for a repository that provides methods for retrieving a single Cargo entity.
 * It extends the generic `GetRepository` with `Primitives<CargoId>` as the ID type and `CargoDto` as the entity type.
 */
export abstract class CargoGetRepository extends GetRepository<Primitives<CargoId>, CargoDto> {}
