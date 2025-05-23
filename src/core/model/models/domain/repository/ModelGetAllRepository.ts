import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type ModelDto } from '../dto/Model.dto'

export abstract class ModelGetAllRepository extends GetAllRepository<ModelDto> {}
