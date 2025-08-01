import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ModelDto } from '../dto/Model.dto'
import { ModelId } from '../value-object/ModelId'

export abstract class ModelGetRepository extends GetRepository<Primitives<ModelId>, ModelDto> {}
