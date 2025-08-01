import { fetching } from '@/shared/api/api'
import { type VicepresidenciaSaveRepository } from '../../domain/repository/VicepresidenciaSaveRepository'
import { type VicepresidenciaPrimitives } from '../../domain/dto/Vicepresidencia.dto'
import { vicepresidenciaUrl } from '../../domain/entity/baseUrl'

export class VicepresidenciaSaveService implements VicepresidenciaSaveRepository {
	async save({ payload }: { payload: VicepresidenciaPrimitives }): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: vicepresidenciaUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: VicepresidenciaPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${vicepresidenciaUrl}/${id}`,
			data: payload
		})
	}
}
