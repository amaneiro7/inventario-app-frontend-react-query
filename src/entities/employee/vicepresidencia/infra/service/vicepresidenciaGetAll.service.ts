import { fetching } from '@/shared/api/api'
import { type VicepresidenciaGetAllRepository } from '../../domain/repository/VicepresidenciaGetAllRepository'
import { type VicepresidenciaDto } from '../../domain/dto/Vicepresidencia.dto'
import { type Response } from '@/entities/shared/domain/methods/Response'
import { vicepresidenciaUrl } from '../../domain/entity/baseUrl'

export class VicepresidenciaGetAllService implements VicepresidenciaGetAllRepository {
	async getAll(queryParams: string): Promise<Response<VicepresidenciaDto>> {
		return await fetching({
			url: `${vicepresidenciaUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
