import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type DeviceDto } from '../dto/Device.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceId } from '../value-object/DeviceId'

/**
 * @abstract
 * @class DeviceGetRepository
 * @extends {GetRepository<Primitives<DeviceId>, DeviceDto>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite obtener una entidad `Device` por su ID.
 * Define el método `getById` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class DeviceGetRepository extends GetRepository<Primitives<DeviceId>, DeviceDto> {}