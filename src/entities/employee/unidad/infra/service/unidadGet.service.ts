import { fetching } from '@/shared/api/api'
import { unidadUrl } from '../../domain/entity/baseUrl'
import { type UnidadGetRepository } from '../../domain/repository/UnidadGetRepository'
import { type UnidadDto } from '../../domain/dto/Unidad.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UnidadId } from '../../domain/value-object/UnidadId'

/**
 * Implementation of the UnidadGetRepository interface using the fetching utility.
 * This service is responsible for retrieving Unidad data from the API.
 */
export class UnidadGetService implements UnidadGetRepository {
	/**
	 * Retrieves a Unidad by its ID.
	 * @param params - An object containing the ID of the Unidad to retrieve.
	 * @param params.id - The primitive value of the UnidadId.
	 * @returns A Promise that resolves to the UnidadDto.
	 */
	async getById({ id }: { id: Primitives<UnidadId> }): Promise<UnidadDto> {
		return await fetching<UnidadDto>({
			url: `${unidadUrl}/${id}`,
			method: 'GET'
		})
	}
}
