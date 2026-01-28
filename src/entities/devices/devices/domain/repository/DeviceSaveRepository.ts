import { SaveRepository } from '@/entities/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DevicePrimitives } from '../dto/Device.dto'
import { type DeviceId } from '../value-object/DeviceId'

/**
 * @abstract
 * @class DeviceSaveRepository
 * @extends {SaveRepository<Primitives<DeviceId>, DevicePrimitives>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite guardar o actualizar entidades `Device`.
 * Define los métodos `save` y `update` que deben ser implementados por los adaptadores de infraestructura.
 */
export abstract class DeviceSaveRepository extends SaveRepository<
	Primitives<DeviceId>,
	DevicePrimitives
> {}
