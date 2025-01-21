import { fetching } from '@/api/api'
import { centroCostoUrl } from '../domain/entity/baseUrl'
import { type CentroCostoGetRepository } from '../domain/repository/CentroCostoGetRepository'
import { type CentroCostoDto } from '../domain/dto/CentroCosto.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CentroCostoId } from '../domain/value-object/CentroCostoId'

export class CentroCostoGetService implements CentroCostoGetRepository {
	async getById({
		id
	}: {
		id: Primitives<CentroCostoId>
	}): Promise<CentroCostoDto> {
		return await fetching<CentroCostoDto>({
			url: centroCostoUrl,
			method: 'GET',
			params: id
		})
	}
}
