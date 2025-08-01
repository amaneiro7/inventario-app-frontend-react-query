import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type BrandId } from '../value-object/BrandId'
import { type BrandPrimitives } from '../dto/Brand.dto'

export abstract class BrandSaveRepository extends SaveRepository<
	Primitives<BrandId>,
	BrandPrimitives
> {}
