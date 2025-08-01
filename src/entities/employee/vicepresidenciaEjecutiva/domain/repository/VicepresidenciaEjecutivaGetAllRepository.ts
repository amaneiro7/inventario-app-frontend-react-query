import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type VicepresidenciaEjecutivaDto } from '../dto/VicepresidenciaEjecutiva.dto'

export abstract class VicepresidenciaEjecutivaGetAllRepository extends GetAllRepository<VicepresidenciaEjecutivaDto> {}
