import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type CentroTrabajoDto } from '../dto/CentroTrabajo.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CentroTrabajoId } from '../value-object/CentroTrabajoId'

export abstract class CentroTrabajoGetRepository extends GetRepository<
	Primitives<CentroTrabajoId>,
	CentroTrabajoDto
> {}
