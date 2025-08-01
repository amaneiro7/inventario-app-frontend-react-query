import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CentroCostoDto } from '../domain/dto/CentroCosto.dto'
import { type CentroCostoId } from '../domain/value-object/CentroCostoId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

export class CentroCostoGetter extends GetBaseService<Primitives<CentroCostoId>, CentroCostoDto> {}
