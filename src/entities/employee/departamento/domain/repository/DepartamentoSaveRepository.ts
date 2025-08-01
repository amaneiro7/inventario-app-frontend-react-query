import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoPrimitives } from '../dto/Departamento.dto'
import { type DepartamentoId } from '../value-object/DepartamentoId'

export abstract class DepartamentoSaveRepository extends SaveRepository<
	Primitives<DepartamentoId>,
	DepartamentoPrimitives
> {}
