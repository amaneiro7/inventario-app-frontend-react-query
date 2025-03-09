import { fetching } from '@/api/api'
import { cityUrl } from '../../domain/entity/baseUrl'
import { CityGetRepository } from '../../domain/repository/CityGetRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CityDto } from '../../domain/dto/City.dto'
import { type CityId } from '../../domain/value-object/CityId'

export class CityGetService implements CityGetRepository {
	async getById({ id }: { id: Primitives<CityId> }): Promise<CityDto> {
		return await fetching<CityDto>({
			url: `${cityUrl}/${id}`,
			method: 'GET'
		})
	}
}
