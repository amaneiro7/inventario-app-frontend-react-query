import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CargoPrimitives } from '../dto/Cargo.dto'
import { type CargoId } from '../value-object/CargoId'

export abstract class CargoSaveRepository extends SaveRepository<
	Primitives<CargoId>,
	CargoPrimitives
> {}
