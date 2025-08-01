import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type CargoDto } from '../dto/Cargo.dto'

export abstract class CargoGetAllRepository extends GetAllRepository<CargoDto> {}
