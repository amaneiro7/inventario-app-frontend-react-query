import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type CargoDto } from '../domain/dto/Cargo.dto'

export class CargoGetAll extends GetAllBaseService<CargoDto> {}
