import { type CargoDto } from '../domain/dto/Cargo.dto'
import { type CargoId } from '../domain/value-object/CargoId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class CargoGetter extends GetBaseService<CargoId, CargoDto> {}
