import { fetching } from '@/api/api'
import { type CargoGetAllRepository } from '../../domain/repository/CargoGetAllRepository'
import { type CargoDto } from '../../domain/dto/Cargo.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { cargoUrl } from '../../domain/entity/baseUrl'

export class CargoGetAllService implements CargoGetAllRepository {
	async getAll(queryParams: string): Promise<Response<CargoDto>> {
		return await fetching({
			url: `${cargoUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
