import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CargoDto } from '../domain/dto/Cargo.dto'
import { type CargoId } from '../domain/value-object/CargoId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * Service class for retrieving a single Cargo entity by its ID.
 * It extends GetBaseService, providing generic functionality for fetching a single record
 * of type CargoDto using a CargoId primitive as the identifier.
 */
export class CargoGetter extends GetBaseService<Primitives<CargoId>, CargoDto> {}
