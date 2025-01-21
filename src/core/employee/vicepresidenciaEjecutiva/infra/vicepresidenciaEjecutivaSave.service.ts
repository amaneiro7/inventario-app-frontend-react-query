import { fetching } from '@/api/api'
import { type VicepresidenciaEjecutivaSaveRepository } from '../domain/repository/VicepresidenciaEjecutivaSaveRepository'
import { type VicepresidenciaEjecutivaPrimitives } from '../domain/dto/VicepresidenciaEjecutiva.dto'
import { vicepresidenciaEjecutivaUrl } from '../domain/entity/baseUrl'

export class VicepresidenciaEjecutivaSaveService
	implements VicepresidenciaEjecutivaSaveRepository
{
	async save({
		payload
	}: {
		payload: VicepresidenciaEjecutivaPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: vicepresidenciaEjecutivaUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: VicepresidenciaEjecutivaPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: vicepresidenciaEjecutivaUrl,
			data: payload,
			params: id
		})
	}
}
