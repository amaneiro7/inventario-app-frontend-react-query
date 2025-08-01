import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DevicePrimitives } from '../dto/Device.dto'
import { type DeviceId } from '../value-object/DeviceId'

export abstract class DeviceSaveRepository extends SaveRepository<
	Primitives<DeviceId>,
	DevicePrimitives
> {}
