import { fetching } from '@/api/api'
import { type DepartamentoGetAllRepository } from '../domain/repository/DepartamentoGetAllRepository'
import { type DepartamentoDto } from '../domain/dto/Departamento.dto'
import { departamentoUrl } from '../domain/entity/baseUrl'

export class DepartamentoGetAllService implements DepartamentoGetAllRepository {
	async getAll(): Promise<DepartamentoDto[]> {
		return await fetching<DepartamentoDto[]>({
			url: departamentoUrl,
			method: 'GET'
		})
	}
}
