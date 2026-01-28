import { fetching } from '@/shared/api/api'
import { type DirectivaSaveRepository } from '../../domain/repository/DirectivaSaveRepository'
import { type DirectivaPrimitives } from '../../domain/dto/Directiva.dto'
import { directivaUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the DirectivaSaveRepository interface using the fetching utility.
 * This service is responsible for saving (creating) and updating directiva data via the API.
 */
export class DirectivaSaveService implements DirectivaSaveRepository {
	/**
	 * Saves a new directiva record.
	 * @param params - An object containing the payload for the new directiva.
	 * @param params.payload - The DirectivaPrimitives object containing the directiva data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async save({ payload }: { payload: DirectivaPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: directivaUrl,
			data: payload
		})
	}

	/**
	 * Updates an existing directiva record.
	 * @param params - An object containing the ID of the directiva to update and the payload.
	 * @param params.id - The ID of the directiva to update.
	 * @param params.payload - The DirectivaPrimitives object containing the updated directiva data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async update({
		id,
		payload
	}: {
		id: string
		payload: DirectivaPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${directivaUrl}/${id}`,
			data: payload
		})
	}
}
