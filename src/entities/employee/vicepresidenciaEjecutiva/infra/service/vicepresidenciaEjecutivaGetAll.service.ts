import { fetching } from '@/shared/api/api'
import { type VicepresidenciaEjecutivaGetAllRepository } from '../../domain/repository/VicepresidenciaEjecutivaGetAllRepository'
import { type VicepresidenciaEjecutivaDto } from '../../domain/dto/VicepresidenciaEjecutiva.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { vicepresidenciaEjecutivaUrl } from '../../domain/entity/baseUrl'

export class VicepresidenciaEjecutivaGetAllService
	implements VicepresidenciaEjecutivaGetAllRepository
{
	async getAll(queryParams: string): Promise<Response<VicepresidenciaEjecutivaDto>> {
		return await fetching({
			url: `${vicepresidenciaEjecutivaUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
