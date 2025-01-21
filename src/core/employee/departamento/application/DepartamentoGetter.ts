import { type DepartamentoDto } from '../domain/dto/Departamento.dto'
import { type DepartamentoId } from '../domain/value-object/DepartamentoId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class DepartamentoGetter extends GetBaseService<
	DepartamentoId,
	DepartamentoDto
> {}
