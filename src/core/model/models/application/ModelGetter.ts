import { type AllModelsDto } from '../domain/dto/AllModels.dto'
import { type ModelId } from '../domain/value-object/ModelId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class ModelGetter extends GetBaseService<ModelId, AllModelsDto> {}
