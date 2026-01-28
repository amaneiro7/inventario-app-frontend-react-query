import { fetching } from '@/shared/api/api'
import { vicepresidenciaEjecutivaUrl } from '../../domain/entity/baseUrl'
import { type VicepresidenciaEjecutivaGetRepository } from '../../domain/repository/VicepresidenciaEjecutivaGetRepository'
import { type VicepresidenciaEjecutivaDto } from '../../domain/dto/VicepresidenciaEjecutiva.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaId } from '../../domain/value-object/VicepresidenciaEjecutivaId'

/**
 * Implementation of the VicepresidenciaEjecutivaGetRepository interface using the fetching utility.
 * This service is responsible for retrieving executive vicepresidencia data from the API.
 */
export class VicepresidenciaEjecutivaGetService implements VicepresidenciaEjecutivaGetRepository {
	/**
	 * Retrieves an executive vicepresidencia by its ID.
	 * @param params - An object containing the ID of the executive vicepresidencia to retrieve.
	 * @param params.id - The primitive value of the VicepresidenciaEjecutivaId.
	 * @returns A Promise that resolves to the VicepresidenciaEjecutivaDto.
	 */
	async getById({
		id
	}: {
		id: Primitives<VicepresidenciaEjecutivaId>
	}): Promise<VicepresidenciaEjecutivaDto> {
		return await fetching<VicepresidenciaEjecutivaDto>({
			url: `${vicepresidenciaEjecutivaUrl}/${id}`,
			method: 'GET'
		})
	}
}
