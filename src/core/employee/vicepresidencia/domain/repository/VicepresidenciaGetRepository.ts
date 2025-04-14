import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type VicepresidenciaDto } from '../dto/Vicepresidencia.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaId } from '../value-object/VicepresidenciaId'

export abstract class VicepresidenciaGetRepository extends GetRepository<
	Primitives<VicepresidenciaId>,
	VicepresidenciaDto
> {}
