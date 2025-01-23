import { type ModelDto } from '../domain/dto/Model.dto'
import { type ModelId } from '../domain/value-object/ModelId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class ModelGetter extends GetBaseService<ModelId, ModelDto> {}
