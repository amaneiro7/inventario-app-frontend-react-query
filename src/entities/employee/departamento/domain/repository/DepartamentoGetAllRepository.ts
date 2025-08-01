import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type DepartamentoDto } from '../dto/Departamento.dto'

export abstract class DepartamentoGetAllRepository extends GetAllRepository<DepartamentoDto> {}
