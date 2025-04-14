import { fetching } from '@/api/api'
import { vicepresidenciaUrl } from '../../domain/entity/baseUrl'
import { type VicepresidenciaGetRepository } from '../../domain/repository/VicepresidenciaGetRepository'
import { type VicepresidenciaDto } from '../../domain/dto/Vicepresidencia.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type VicepresidenciaId } from '../../domain/value-object/VicepresidenciaId'

export class VicepresidenciaGetService implements VicepresidenciaGetRepository {
	async getById({ id }: { id: Primitives<VicepresidenciaId> }): Promise<VicepresidenciaDto> {
		return await fetching<VicepresidenciaDto>({
			url: `${vicepresidenciaUrl}/${id}`,
			method: 'GET'
		})
	}
}
