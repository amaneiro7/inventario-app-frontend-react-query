import { fetching } from '@/api/api'
import { deviceUrl } from '../domain/entity/baseUrl'
import { type DeviceGetRepository } from '../domain/repository/DeviceGetRepository'
import { type DeviceDto } from '../domain/dto/Device.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DeviceId } from '../domain/value-object/DeviceId'

export class DeviceGetService implements DeviceGetRepository {
	async getById({ id }: { id: Primitives<DeviceId> }): Promise<DeviceDto> {
		return await fetching<DeviceDto>({
			url: `${deviceUrl}/${id}`,
			method: 'GET'
		})
	}
}
