import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CargoPrimitives } from '../dto/Cargo.dto'
import { type CargoId } from '../value-object/CargoId'

/**
 * Abstract class for a repository that provides methods for saving (creating and updating) Cargo entities.
 * It extends the generic `SaveRepository` with `Primitives<CargoId>` as the ID type and `CargoPrimitives` as the entity type.
 */
export abstract class CargoSaveRepository extends SaveRepository<
	Primitives<CargoId>,
	CargoPrimitives
> {}