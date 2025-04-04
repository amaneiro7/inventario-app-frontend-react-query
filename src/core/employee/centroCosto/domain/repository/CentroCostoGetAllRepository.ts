import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type CentroCostoDto } from '../dto/CentroCosto.dto'

export abstract class CentroCostoGetAllRepository extends GetAllRepository<CentroCostoDto> {}
