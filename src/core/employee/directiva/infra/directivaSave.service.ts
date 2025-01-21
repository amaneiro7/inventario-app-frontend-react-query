import { fetching } from '@/api/api'
import { type DirectivaSaveRepository } from '../domain/repository/DirectivaSaveRepository'
import { type DirectivaPrimitives } from '../domain/dto/Directiva.dto'
import { directivaUrl } from '../domain/entity/baseUrl'

export class DirectivaSaveService implements DirectivaSaveRepository {
	async save({
		payload
	}: {
		payload: DirectivaPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: directivaUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: DirectivaPrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: directivaUrl,
			data: payload,
			params: id
		})
	}
}
