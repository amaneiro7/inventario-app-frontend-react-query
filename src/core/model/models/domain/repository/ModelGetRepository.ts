import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type AllModelsDto } from '../dto/AllModels.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { ModelId } from '../value-object/ModelId'

export abstract class ModelGetRepository extends GetRepository<Primitives<ModelId>, AllModelsDto> {}
