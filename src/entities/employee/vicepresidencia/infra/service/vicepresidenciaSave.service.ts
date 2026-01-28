import { fetching } from '@/shared/api/api'
import { type VicepresidenciaSaveRepository } from '../../domain/repository/VicepresidenciaSaveRepository'
import { type VicepresidenciaPrimitives } from '../../domain/dto/Vicepresidencia.dto'
import { vicepresidenciaUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the VicepresidenciaSaveRepository interface using the fetching utility.
 * This service is responsible for saving (creating) and updating vicepresidencia data via the API.
 */
export class VicepresidenciaSaveService implements VicepresidenciaSaveRepository {
	/**
	 * Saves a new vicepresidencia record.
	 * @param params - An object containing the payload for the new vicepresidencia.
	 * @param params.payload - The VicepresidenciaPrimitives object containing the vicepresidencia data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async save({ payload }: { payload: VicepresidenciaPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: vicepresidenciaUrl,
			data: payload
		})
	}

	/**
	 * Updates an existing vicepresidencia record.
	 * @param params - An object containing the ID of the vicepresidencia to update and the payload.
	 * @param params.id - The ID of the vicepresidencia to update.
	 * @param params.payload - The VicepresidenciaPrimitives object containing the updated vicepresidencia data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async update({
		id,
		payload
	}: {
		id: string
		payload: VicepresidenciaPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${vicepresidenciaUrl}/${id}`,
			data: payload
		})
	}
}
