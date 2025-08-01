import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type DepartamentoDto } from '../dto/Departamento.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoId } from '../value-object/DepartamentoId'

export abstract class DepartamentoGetRepository extends GetRepository<
	Primitives<DepartamentoId>,
	DepartamentoDto
> {}
