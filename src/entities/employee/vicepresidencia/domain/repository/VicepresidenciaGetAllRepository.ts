import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type VicepresidenciaDto } from '../dto/Vicepresidencia.dto'

export abstract class VicepresidenciaGetAllRepository extends GetAllRepository<VicepresidenciaDto> {}
