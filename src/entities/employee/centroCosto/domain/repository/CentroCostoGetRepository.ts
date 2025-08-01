import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type CentroCostoDto } from '../dto/CentroCosto.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CentroCostoId } from '../value-object/CentroCostoId'

export abstract class CentroCostoGetRepository extends GetRepository<
	Primitives<CentroCostoId>,
	CentroCostoDto
> {}
