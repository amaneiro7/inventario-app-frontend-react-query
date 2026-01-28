import { fetching } from '@/shared/api/api'
import { cargoUrl } from '../../domain/entity/baseUrl'
import { type CargoGetRepository } from '../../domain/repository/CargoGetRepository'
import { type CargoDto } from '../../domain/dto/Cargo.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type CargoId } from '../../domain/value-object/CargoId'

/**
 * Implementation of the CargoGetRepository interface using the fetching utility.
 * This service is responsible for retrieving cargo data from the API.
 */
export class CargoGetService implements CargoGetRepository {
	/**
	 * Retrieves a cargo by its ID.
	 * @param params - An object containing the ID of the cargo to retrieve.
	 * @param params.id - The primitive value of the CargoId.
	 * @returns A Promise that resolves to the CargoDto.
	 */
	async getById({ id }: { id: Primitives<CargoId> }): Promise<CargoDto> {
		return await fetching<CargoDto>({
			url: `${cargoUrl}/${id}`,
			method: 'GET'
		})
	}
}
