import { fetching } from '@/api/api'
import { type CentroCostoSaveRepository } from '../domain/repository/CentroCostoSaveRepository'
import { type CentroCostoPrimitives } from '../domain/dto/CentroCosto.dto'
import { centroCostoUrl } from '../domain/entity/baseUrl'

export class CentroCostoSaveService implements CentroCostoSaveRepository {
	async save({
		payload
	}: {
		payload: CentroCostoPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: centroCostoUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: CentroCostoPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${centroCostoUrl}/${id}`,
			data: payload
		})
	}
}
