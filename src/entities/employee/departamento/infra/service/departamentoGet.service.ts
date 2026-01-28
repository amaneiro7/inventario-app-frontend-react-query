import { fetching } from '@/shared/api/api'
import { departamentoUrl } from '../../domain/entity/baseUrl'
import { type DepartamentoGetRepository } from '../../domain/repository/DepartamentoGetRepository'
import { type DepartamentoDto } from '../../domain/dto/Departamento.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DepartamentoId } from '../../domain/value-object/DepartamentoId'

/**
 * Implementation of the DepartamentoGetRepository interface using the fetching utility.
 * This service is responsible for retrieving departamento data from the API.
 */
export class DepartamentoGetService implements DepartamentoGetRepository {
	/**
	 * Retrieves a departamento by its ID.
	 * @param params - An object containing the ID of the departamento to retrieve.
	 * @param params.id - The primitive value of the DepartamentoId.
	 * @returns A Promise that resolves to the DepartamentoDto.
	 */
	async getById({ id }: { id: Primitives<DepartamentoId> }): Promise<DepartamentoDto> {
		return await fetching<DepartamentoDto>({
			url: `${departamentoUrl}/${id}`,
			method: 'GET'
		})
	}
}
