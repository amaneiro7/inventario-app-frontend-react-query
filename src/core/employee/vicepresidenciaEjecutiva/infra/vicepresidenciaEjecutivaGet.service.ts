import { fetching } from '@/api/api'
import { vicepresidenciaEjecutivaUrl } from '../domain/entity/baseUrl'
import { type VicepresidenciaEjecutivaGetRepository } from '../domain/repository/VicepresidenciaEjecutivaGetRepository'
import { type VicepresidenciaEjecutivaDto } from '../domain/dto/VicepresidenciaEjecutiva.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaEjecutivaId } from '../domain/value-object/VicepresidenciaEjecutivaId'

export class VicepresidenciaEjecutivaGetService
	implements VicepresidenciaEjecutivaGetRepository
{
	async getById({
		id
	}: {
		id: Primitives<VicepresidenciaEjecutivaId>
	}): Promise<VicepresidenciaEjecutivaDto> {
		return await fetching<VicepresidenciaEjecutivaDto>({
			url: vicepresidenciaEjecutivaUrl,
			method: 'GET',
			params: id
		})
	}
}
