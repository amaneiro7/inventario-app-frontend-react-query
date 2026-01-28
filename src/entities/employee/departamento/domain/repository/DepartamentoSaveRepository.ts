import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoPrimitives } from '../dto/Departamento.dto'
import { type DepartamentoId } from '../value-object/DepartamentoId'

/**
 * Abstract class for a repository that provides methods for saving (creating and updating) Departamento entities.
 * It extends the generic `SaveRepository` with `Primitives<DepartamentoId>` as the ID type and `DepartamentoPrimitives` as the entity type.
 */
export abstract class DepartamentoSaveRepository extends SaveRepository<
	Primitives<DepartamentoId>,
	DepartamentoPrimitives
> {}
