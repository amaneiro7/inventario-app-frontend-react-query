import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type VicepresidenciaEjecutivaDto } from '../dto/VicepresidenciaEjecutiva.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaId } from '../value-object/VicepresidenciaEjecutivaId'

export abstract class VicepresidenciaEjecutivaGetRepository extends GetRepository<
	Primitives<VicepresidenciaEjecutivaId>,
	VicepresidenciaEjecutivaDto
> {}
