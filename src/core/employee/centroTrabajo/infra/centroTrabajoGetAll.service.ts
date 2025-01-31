import { fetching } from '@/api/api'
import { type CentroTrabajoGetAllRepository } from '../domain/repository/CentroTrabajoGetAllRepository'
import { type CentroTrabajoDto } from '../domain/dto/CentroTrabajo.dto'
import { centroTrabajoUrl } from '../domain/entity/baseUrl'

export class CentroTrabajoGetAllService implements CentroTrabajoGetAllRepository {
	async getAll(): Promise<CentroTrabajoDto[]> {
		return await fetching<CentroTrabajoDto[]>({
			url: centroTrabajoUrl,
			method: 'GET'
		})
	}
}
