import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type CentroCostoDto } from '../domain/dto/CentroCosto.dto'

export class CentroCostoGetAll extends GetAllBaseService<CentroCostoDto> {}
