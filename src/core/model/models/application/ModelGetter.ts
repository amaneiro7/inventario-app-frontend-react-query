import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelDto } from '../domain/dto/Model.dto'
import { type ModelId } from '../domain/value-object/ModelId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class ModelGetter extends GetBaseService<Primitives<ModelId>, ModelDto> {}
