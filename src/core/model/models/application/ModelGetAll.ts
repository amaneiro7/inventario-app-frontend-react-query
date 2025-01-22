import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type AllModelsDto } from '../domain/dto/AllModels.dto'

export class ModelGetAll extends GetAllBaseService<AllModelsDto> {}
