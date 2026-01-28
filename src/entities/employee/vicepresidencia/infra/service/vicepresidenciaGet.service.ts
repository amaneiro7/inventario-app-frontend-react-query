import { fetching } from '@/shared/api/api'
import { vicepresidenciaUrl } from '../../domain/entity/baseUrl'
import { type VicepresidenciaGetRepository } from '../../domain/repository/VicepresidenciaGetRepository'
import { type VicepresidenciaDto } from '../../domain/dto/Vicepresidencia.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type VicepresidenciaId } from '../../domain/value-object/VicepresidenciaId'

/**
 * Implementation of the VicepresidenciaGetRepository interface using the fetching utility.
 * This service is responsible for retrieving vicepresidencia data from the API.
 */
export class VicepresidenciaGetService implements VicepresidenciaGetRepository {
	/**
	 * Retrieves a vicepresidencia by its ID.
	 * @param params - An object containing the ID of the vicepresidencia to retrieve.
	 * @param params.id - The primitive value of the VicepresidenciaId.
	 * @returns A Promise that resolves to the VicepresidenciaDto.
	 */
	async getById({ id }: { id: Primitives<VicepresidenciaId> }): Promise<VicepresidenciaDto> {
		return await fetching<VicepresidenciaDto>({
			url: `${vicepresidenciaUrl}/${id}`,
			method: 'GET'
		})
	}
}
