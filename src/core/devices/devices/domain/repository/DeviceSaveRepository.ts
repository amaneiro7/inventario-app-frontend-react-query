import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DevicePrimitives } from '../dto/Device.dto'
import { type DeviceId } from '../value-object/DeviceId'

export abstract class DeviceSaveRepository extends SaveRepository<
	Primitives<DeviceId>,
	DevicePrimitives
> {}
