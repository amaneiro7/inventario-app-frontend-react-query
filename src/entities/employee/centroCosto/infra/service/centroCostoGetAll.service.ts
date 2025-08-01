import { fetching } from '@/shared/api/api'
import { type CentroCostoGetAllRepository } from '../../domain/repository/CentroCostoGetAllRepository'
import { type CentroCostoDto } from '../../domain/dto/CentroCosto.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { centroCostoUrl } from '../../domain/entity/baseUrl'

export class CentroCostoGetAllService implements CentroCostoGetAllRepository {
	async getAll(queryParams: string): Promise<Response<CentroCostoDto>> {
		return await fetching({
			url: `${centroCostoUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
