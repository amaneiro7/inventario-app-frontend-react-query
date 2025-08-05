import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type DepartamentoDto } from '../domain/dto/Departamento.dto'

/**
 * Service class for retrieving all Departamento entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type DepartamentoDto.
 */
export class DepartamentoGetAll extends GetAllBaseService<DepartamentoDto> {}