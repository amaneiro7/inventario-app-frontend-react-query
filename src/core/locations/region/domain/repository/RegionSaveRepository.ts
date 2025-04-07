import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type RegionId } from '../value-object/RegionId'
import { type RegionPrimitives } from '../dto/region.dto'

export abstract class RegionSaveRepository {
	abstract update({
		id,
		payload
	}: {
		id: Primitives<RegionId>
		payload: RegionPrimitives
	}): Promise<{ message: string }>
}
