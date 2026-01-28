import { fetching } from '@/shared/api/api'
import { directivaUrl } from '../../domain/entity/baseUrl'
import { type DirectivaGetRepository } from '../../domain/repository/DirectivaGetRepository'
import { type DirectivaDto } from '../../domain/dto/Directiva.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DirectivaId } from '../../domain/value-object/DirectivaId'

/**
 * Implementation of the DirectivaGetRepository interface using the fetching utility.
 * This service is responsible for retrieving directiva data from the API.
 */
export class DirectivaGetService implements DirectivaGetRepository {
	/**
	 * Retrieves a directiva by its ID.
	 * @param params - An object containing the ID of the directiva to retrieve.
	 * @param params.id - The primitive value of the DirectivaId.
	 * @returns A Promise that resolves to the DirectivaDto.
	 */
	async getById({ id }: { id: Primitives<DirectivaId> }): Promise<DirectivaDto> {
		return await fetching<DirectivaDto>({
			url: `${directivaUrl}/${id}`,
			method: 'GET'
		})
	}
}
