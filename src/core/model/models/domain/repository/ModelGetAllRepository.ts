import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type AllModelsDto } from '../dto/AllModels.dto'

export abstract class ModelGetAllRepository extends GetAllRepository<AllModelsDto> {}
