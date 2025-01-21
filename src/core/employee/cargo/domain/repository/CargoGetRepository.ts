import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type CargoDto } from '../dto/Cargo.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CargoId } from '../value-object/CargoId'

export abstract class CargoGetRepository extends GetRepository<
	Primitives<CargoId>,
	CargoDto
> {}
