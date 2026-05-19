import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type UnidadDto } from '../domain/dto/Unidad.dto'

/**
 * Service class for retrieving all Unidad entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type UnidadDto.
 */
export class UnidadGetAll extends GetAllBaseService<UnidadDto> {}
