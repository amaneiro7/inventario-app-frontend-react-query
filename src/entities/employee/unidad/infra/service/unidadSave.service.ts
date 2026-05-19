import { fetching } from '@/shared/api/api'
import { type UnidadSaveRepository } from '../../domain/repository/UnidadSaveRepository'
import { type UnidadPrimitives } from '../../domain/dto/Unidad.dto'
import { unidadUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the UnidadSaveRepository interface using the fetching utility.
 * This service is responsible for saving (creating) and updating Unidad data via the API.
 */
export class UnidadSaveService implements UnidadSaveRepository {
	/**
	 * Saves a new Unidad record.
	 * @param params - An object containing the payload for the new Unidad.
	 * @param params.payload - The UnidadPrimitives object containing the Unidad data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async save({ payload }: { payload: UnidadPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: unidadUrl,
			data: payload
		})
	}

	/**
	 * Updates an existing Unidad record.
	 * @param params - An object containing the ID of the Unidad to update and the payload.
	 * @param params.id - The ID of the Unidad to update.
	 * @param params.payload - The UnidadPrimitives object containing the updated Unidad data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async update({
		id,
		payload
	}: {
		id: string
		payload: UnidadPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${unidadUrl}/${id}`,
			data: payload
		})
	}
}
