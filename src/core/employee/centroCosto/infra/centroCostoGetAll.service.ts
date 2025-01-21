import { fetching } from '@/api/api'
import { type CentroCostoGetAllRepository } from '../domain/repository/CentroCostoGetAllRepository'
import { type CentroCostoDto } from '../domain/dto/CentroCosto.dto'
import { centroCostoUrl } from '../domain/entity/baseUrl'

export class CentroCostoGetAllService implements CentroCostoGetAllRepository {
	async getAll(): Promise<CentroCostoDto[]> {
		return await fetching<CentroCostoDto[]>({
			url: centroCostoUrl,
			method: 'GET'
		})
	}
}
