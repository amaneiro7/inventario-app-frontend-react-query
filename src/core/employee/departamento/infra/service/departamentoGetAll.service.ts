import { fetching } from '@/api/api'
import { type DepartamentoGetAllRepository } from '../../domain/repository/DepartamentoGetAllRepository'
import { type DepartamentoDto } from '../../domain/dto/Departamento.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { departamentoUrl } from '../../domain/entity/baseUrl'

export class DepartamentoGetAllService implements DepartamentoGetAllRepository {
	async getAll(queryParams: string): Promise<Response<DepartamentoDto>> {
		return await fetching({
			url: `${departamentoUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
