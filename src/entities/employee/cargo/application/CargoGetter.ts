import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CargoDto } from '../domain/dto/Cargo.dto'
import { type CargoId } from '../domain/value-object/CargoId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

export class CargoGetter extends GetBaseService<Primitives<CargoId>, CargoDto> {}
