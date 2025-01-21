import { fetching } from '@/api/api'
import { type VicepresidenciaEjecutivaGetAllRepository } from '../domain/repository/VicepresidenciaEjecutivaGetAllRepository'
import { type VicepresidenciaEjecutivaDto } from '../domain/dto/VicepresidenciaEjecutiva.dto'
import { vicepresidenciaEjecutivaUrl } from '../domain/entity/baseUrl'

export class VicepresidenciaEjecutivaGetAllService
	implements VicepresidenciaEjecutivaGetAllRepository
{
	async getAll(): Promise<VicepresidenciaEjecutivaDto[]> {
		return await fetching<VicepresidenciaEjecutivaDto[]>({
			url: vicepresidenciaEjecutivaUrl,
			method: 'GET'
		})
	}
}
