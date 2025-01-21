import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CargoPrimitives } from '../dto/Cargo.dto'
import { type CargoId } from '../value-object/CargoId'

export abstract class CargoSaveRepository extends SaveRepository<
	Primitives<CargoId>,
	CargoPrimitives
> {}
