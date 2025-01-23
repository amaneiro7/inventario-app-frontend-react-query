import { fetching } from '@/api/api'
import { type CentroTrabajoSaveRepository } from '../domain/repository/CentroTrabajoSaveRepository'
import { type CentroTrabajoPrimitives } from '../domain/dto/CentroTrabajo.dto'
import { centroTrabajoUrl } from '../domain/entity/baseUrl'

export class CentroTrabajoSaveService implements CentroTrabajoSaveRepository {
	async save({
		payload
	}: {
		payload: CentroTrabajoPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: centroTrabajoUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: CentroTrabajoPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${centroTrabajoUrl}/${id}`,
			data: payload
		})
	}
}
