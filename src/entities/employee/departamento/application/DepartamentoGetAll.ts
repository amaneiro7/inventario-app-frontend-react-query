import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type DepartamentoDto } from '../domain/dto/Departamento.dto'

export class DepartamentoGetAll extends GetAllBaseService<DepartamentoDto> {}
