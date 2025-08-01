import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoDto } from '../domain/dto/Departamento.dto'
import { type DepartamentoId } from '../domain/value-object/DepartamentoId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

export class DepartamentoGetter extends GetBaseService<
	Primitives<DepartamentoId>,
	DepartamentoDto
> {}
