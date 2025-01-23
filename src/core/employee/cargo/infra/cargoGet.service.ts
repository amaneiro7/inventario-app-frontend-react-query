import { fetching } from '@/api/api'
import { cargoUrl } from '../domain/entity/baseUrl'
import { type CargoGetRepository } from '../domain/repository/CargoGetRepository'
import { type CargoDto } from '../domain/dto/Cargo.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CargoId } from '../domain/value-object/CargoId'

export class CargoGetService implements CargoGetRepository {
	async getById({ id }: { id: Primitives<CargoId> }): Promise<CargoDto> {
		return await fetching<CargoDto>({
			url: `${cargoUrl}/${id}`,
			method: 'GET'
		})
	}
}
