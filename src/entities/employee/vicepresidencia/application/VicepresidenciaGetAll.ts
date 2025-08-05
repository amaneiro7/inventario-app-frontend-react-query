import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type VicepresidenciaDto } from '../domain/dto/Vicepresidencia.dto'

/**
 * Service class for retrieving all Vicepresidencia entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type VicepresidenciaDto.
 */
export class VicepresidenciaGetAll extends GetAllBaseService<VicepresidenciaDto> {}