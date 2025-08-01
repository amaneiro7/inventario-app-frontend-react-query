import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type CargoDto } from '../dto/Cargo.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CargoId } from '../value-object/CargoId'

export abstract class CargoGetRepository extends GetRepository<Primitives<CargoId>, CargoDto> {}
