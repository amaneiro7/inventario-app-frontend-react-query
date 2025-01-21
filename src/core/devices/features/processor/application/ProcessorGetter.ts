import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type BrandDto } from '../domain/dto/Processor.dto'
import { type BrandId } from '../domain/value-object/ProcessorId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class BrandGetter extends GetBaseService<
	Primitives<BrandId>,
	BrandDto
> {}
