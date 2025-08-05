import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoDto } from '../domain/dto/Departamento.dto'
import { type DepartamentoId } from '../domain/value-object/DepartamentoId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * Service class for retrieving a single Departamento entity by its ID.
 * It extends GetBaseService, providing generic functionality for fetching a single record
 * of type DepartamentoDto using a DepartamentoId primitive as the identifier.
 */
export class DepartamentoGetter extends GetBaseService<
	Primitives<DepartamentoId>,
	DepartamentoDto
> {}