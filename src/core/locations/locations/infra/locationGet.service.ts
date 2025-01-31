import { fetching } from '@/api/api'
import { locationUrl } from '../domain/entity/baseUrl'
import { type LocationGetRepository } from '../domain/repository/LocationGetRepository'
import { type LocationDto } from '../domain/dto/Location.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type LocationId } from '../domain/value-object/LocationId'

export class LocationGetService implements LocationGetRepository {
	async getById({ id }: { id: Primitives<LocationId> }): Promise<LocationDto> {
		return await fetching<LocationDto>({
			url: `${locationUrl}/${id}`,
			method: 'GET'
		})
	}
}
