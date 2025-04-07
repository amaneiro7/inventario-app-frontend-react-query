import { fetching } from '@/api/api'
import { regionUrl } from '../../domain/entity/baseUrl'
import { RegionGetRepository } from '../../domain/repository/RegionGetRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type RegionDto } from '../../domain/dto/region.dto'
import { type RegionId } from '../../domain/value-object/RegionId'

export class RegionGetService implements RegionGetRepository {
	async getById({ id }: { id: Primitives<RegionId> }): Promise<RegionDto> {
		return await fetching<RegionDto>({
			url: `${regionUrl}/${id}`,
			method: 'GET'
		})
	}
}
