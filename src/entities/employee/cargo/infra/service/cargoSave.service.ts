import { fetching } from '@/shared/api/api'
import { type CargoSaveRepository } from '../../domain/repository/CargoSaveRepository'
import { type CargoPrimitives } from '../../domain/dto/Cargo.dto'
import { cargoUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the CargoSaveRepository interface using the fetching utility.
 * This service is responsible for saving (creating) and updating cargo data via the API.
 */
export class CargoSaveService implements CargoSaveRepository {
	/**
	 * Saves a new cargo record.
	 * @param params - An object containing the payload for the new cargo.
	 * @param params.payload - The CargoPrimitives object containing the cargo data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async save({ payload }: { payload: CargoPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: cargoUrl,
			data: payload
		})
	}

	/**
	 * Updates an existing cargo record.
	 * @param params - An object containing the ID of the cargo to update and the payload.
	 * @param params.id - The ID of the cargo to update.
	 * @param params.payload - The CargoPrimitives object containing the updated cargo data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
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