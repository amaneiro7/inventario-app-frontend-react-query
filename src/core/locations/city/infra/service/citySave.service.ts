import { fetching } from '@/api/api'
import { cityUrl } from '../../domain/entity/baseUrl'
import { CitySaveRepository } from '../../domain/repository/CitySaveRepository'
import { type CityPrimitives } from '../../domain/dto/City.dto'

export class CitySaveService implements CitySaveRepository {
	async save({ payload }: { payload: CityPrimitives }): Promise<{ message: string }> {
		return await fetching({ method: 'POST', url: cityUrl, data: payload })
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: CityPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${cityUrl}/${id}`,
			data: payload
		})
	}
}
