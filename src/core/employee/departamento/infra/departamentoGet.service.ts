import { fetching } from '@/api/api'
import { departamentoUrl } from '../domain/entity/baseUrl'
import { type DepartamentoGetRepository } from '../domain/repository/DepartamentoGetRepository'
import { type DepartamentoDto } from '../domain/dto/Departamento.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DepartamentoId } from '../domain/value-object/DepartamentoId'

export class DepartamentoGetService implements DepartamentoGetRepository {
	async getById({
		id
	}: {
		id: Primitives<DepartamentoId>
	}): Promise<DepartamentoDto> {
		return await fetching<DepartamentoDto>({
			url: departamentoUrl,
			method: 'GET',
			params: id
		})
	}
}
