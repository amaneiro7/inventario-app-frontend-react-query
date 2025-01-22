import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelId } from '../value-object/ModelId'
import { type ModelPrimitives } from '../dto/Model.dto'

export abstract class ModelSaveRepository extends SaveRepository<
	Primitives<ModelId>,
	ModelPrimitives
> {}
