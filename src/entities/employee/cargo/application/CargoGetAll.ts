import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type CargoDto } from '../domain/dto/Cargo.dto'

/**
 * Service class for retrieving all Cargo entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type CargoDto.
 */
export class CargoGetAll extends GetAllBaseService<CargoDto> {}
