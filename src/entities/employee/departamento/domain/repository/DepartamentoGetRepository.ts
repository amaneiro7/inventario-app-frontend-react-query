import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type DepartamentoDto } from '../dto/Departamento.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoId } from '../value-object/DepartamentoId'

/**
 * Abstract class for a repository that provides methods for retrieving a single Departamento entity.
 * It extends the generic `GetRepository` with `Primitives<DepartamentoId>` as the ID type and `DepartamentoDto` as the entity type.
 */
export abstract class DepartamentoGetRepository extends GetRepository<
	Primitives<DepartamentoId>,
	DepartamentoDto
> {}
