import { fetching } from '@/api/api'
import { type DeviceSaveRepository } from '../domain/repository/DeviceSaveRepository'
import { type DevicePrimitives } from '../domain/dto/Device.dto'
import { deviceUrl } from '../domain/entity/baseUrl'

export class DeviceSaveService implements DeviceSaveRepository {
	async save({
		payload
	}: {
		payload: DevicePrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'POST',
			url: deviceUrl,
			data: payload
		})
	}

	async update({
		id,
		payload
	}: {
		id: string
		payload: DevicePrimitives
	}): Promise<{ message: string }> {
		return await fetching({
			method: 'PATCH',
			url: `${deviceUrl}/${id}`,
			data: payload
		})
	}
}
