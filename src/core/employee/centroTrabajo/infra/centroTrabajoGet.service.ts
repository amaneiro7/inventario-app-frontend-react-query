import { fetching } from '@/api/api'
import { centroTrabajoUrl } from '../domain/entity/baseUrl'
import { type CentroTrabajoGetRepository } from '../domain/repository/CentroTrabajoGetRepository'
import { type CentroTrabajoDto } from '../domain/dto/CentroTrabajo.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CentroTrabajoId } from '../domain/value-object/CentroTrabajoId'

export class CentroTrabajoGetService implements CentroTrabajoGetRepository {
	async getById({
		id
	}: {
		id: Primitives<CentroTrabajoId>
	}): Promise<CentroTrabajoDto> {
		return await fetching<CentroTrabajoDto>({
			url: `${centroTrabajoUrl}/${id}`,
			method: 'GET'
		})
	}
}
