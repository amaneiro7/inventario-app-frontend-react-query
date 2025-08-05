import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type VicepresidenciaEjecutivaDto } from '../domain/dto/VicepresidenciaEjecutiva.dto'

/**
 * Service class for retrieving all VicepresidenciaEjecutiva entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type VicepresidenciaEjecutivaDto.
 */
export class VicepresidenciaEjecutivaGetAll extends GetAllBaseService<VicepresidenciaEjecutivaDto> {}