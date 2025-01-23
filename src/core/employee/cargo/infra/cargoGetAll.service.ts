import { fetching } from '@/api/api'
import { type CargoGetAllRepository } from '../domain/repository/CargoGetAllRepository'
import { type CargoDto } from '../domain/dto/Cargo.dto'
import { cargoUrl } from '../domain/entity/baseUrl'

export class CargoGetAllService implements CargoGetAllRepository {
	async getAll(): Promise<CargoDto[]> {
		return await fetching<CargoDto[]>({
			url: cargoUrl,
			method: 'GET'
		})
	}
}
