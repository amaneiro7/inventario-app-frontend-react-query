import { fetching } from '@/shared/api/api'
import { type VicepresidenciaEjecutivaSaveRepository } from '../../domain/repository/VicepresidenciaEjecutivaSaveRepository'
import { type VicepresidenciaEjecutivaPrimitives } from '../../domain/dto/VicepresidenciaEjecutiva.dto'
import { vicepresidenciaEjecutivaUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the VicepresidenciaEjecutivaSaveRepository interface using the fetching utility.
 * This service is responsible for saving (creating) and updating executive vicepresidencia data via the API.
 */
export class VicepresidenciaEjecutivaSaveService implements VicepresidenciaEjecutivaSaveRepository {
	/**
	 * Saves a new executive vicepresidencia record.
	 * @param params - An object containing the payload for the new executive vicepresidencia.
	 * @param params.payload - The VicepresidenciaEjecutivaPrimitives object containing the executive vicepresidencia data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async save({
		payload
	}: {
		payload: VicepresidenciaEjecutivaPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: vicepresidenciaEjecutivaUrl,
			data: payload
		})
	}

	/**
	 * Updates an existing executive vicepresidencia record.
	 * @param params - An object containing the ID of the executive vicepresidencia to update and the payload.
	 * @param params.id - The ID of the executive vicepresidencia to update.
	 * @param params.payload - The VicepresidenciaEjecutivaPrimitives object containing the updated executive vicepresidencia data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async update({
		id,
		payload
	}: {
		id: string
		payload: VicepresidenciaEjecutivaPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${vicepresidenciaEjecutivaUrl}/${id}`,
			data: payload
		})
	}
}
