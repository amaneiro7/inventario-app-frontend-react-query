import { fetching } from '@/api/api'
import { type LocationSaveRepository } from '../../domain/repository/LocationSaveRepository'
import { type LocationPrimitives } from '../../domain/dto/Location.dto'
import { locationUrl } from '../../domain/entity/baseUrl'

export class LocationSaveService implements LocationSaveRepository {
	async save({ payload }: { payload: LocationPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: locationUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: LocationPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${locationUrl}/${id}`,
			data: payload
		})
	}
}
