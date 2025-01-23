import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type DeviceDto } from '../dto/Device.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DeviceId } from '../value-object/DeviceId'

export abstract class DeviceGetRepository extends GetRepository<
	Primitives<DeviceId>,
	DeviceDto
> {}
