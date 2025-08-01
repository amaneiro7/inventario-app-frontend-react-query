import { fetching } from '@/shared/api/api'
import { type CentroTrabajoGetAllRepository } from '../../domain/repository/CentroTrabajoGetAllRepository'
import { type CentroTrabajoDto } from '../../domain/dto/CentroTrabajo.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { centroTrabajoUrl } from '../../domain/entity/baseUrl'

export class CentroTrabajoGetAllService implements CentroTrabajoGetAllRepository {
	async getAll(queryParams: string): Promise<Response<CentroTrabajoDto>> {
		return await fetching({
			url: `${centroTrabajoUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
