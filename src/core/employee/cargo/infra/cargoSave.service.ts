import { fetching } from '@/api/api'
import { type CargoSaveRepository } from '../domain/repository/CargoSaveRepository'
import { type CargoPrimitives } from '../domain/dto/Cargo.dto'
import { cargoUrl } from '../domain/entity/baseUrl'

export class CargoSaveService implements CargoSaveRepository {
	async save({
		payload
	}: {
		payload: CargoPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: cargoUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: CargoPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${cargoUrl}/${id}`,
			data: payload
		})
	}
}
