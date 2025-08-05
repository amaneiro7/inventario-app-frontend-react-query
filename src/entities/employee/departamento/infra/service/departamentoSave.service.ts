import { fetching } from '@/shared/api/api'
import { type DepartamentoSaveRepository } from '../../domain/repository/DepartamentoSaveRepository'
import { type DepartamentoPrimitives } from '../../domain/dto/Departamento.dto'
import { departamentoUrl } from '../../domain/entity/baseUrl'

/**
 * Implementation of the DepartamentoSaveRepository interface using the fetching utility.
 * This service is responsible for saving (creating) and updating departamento data via the API.
 */
export class DepartamentoSaveService implements DepartamentoSaveRepository {
	/**
	 * Saves a new departamento record.
	 * @param params - An object containing the payload for the new departamento.
	 * @param params.payload - The DepartamentoPrimitives object containing the departamento data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async save({ payload }: { payload: DepartamentoPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: departamentoUrl,
			data: payload
		})
	}

	/**
	 * Updates an existing departamento record.
	 * @param params - An object containing the ID of the departamento to update and the payload.
	 * @param params.id - The ID of the departamento to update.
	 * @param params.payload - The DepartamentoPrimitives object containing the updated departamento data.
	 * @returns A Promise that resolves to an object with a success message.
	 */
	async update({
		id,
		payload
	}: {
		id: string
		payload: DepartamentoPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${departamentoUrl}/${id}`,
			data: payload
		})
	}
}