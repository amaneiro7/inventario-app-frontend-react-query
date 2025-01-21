import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type DepartamentoDto } from '../domain/dto/Departamento.dto'

export class DepartamentoGetAll extends GetAllBaseService<DepartamentoDto> {}
