import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ModelId } from '../value-object/ModelId'
import { type ModelPrimitives } from '../dto/Model.dto'

export abstract class ModelSaveRepository extends SaveRepository<
	Primitives<ModelId>,
	ModelPrimitives
> {}
