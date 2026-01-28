import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type DepartamentoDto } from '../dto/Departamento.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all Departamento entities.
 * It extends the generic `GetAllRepository` with `DepartamentoDto` as the type parameter.
 */
export abstract class DepartamentoGetAllRepository extends GetAllRepository<DepartamentoDto> {}
