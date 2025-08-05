import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DeviceDto } from '../domain/dto/Device.dto'
import { type DeviceId } from '../domain/value-object/DeviceId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * @class DeviceGetter
 * @extends {GetBaseService<Primitives<DeviceId>, DeviceDto>}
 * @description Servicio de aplicación para obtener una entidad `Device` por su ID.
 * Extiende de `GetBaseService` para reutilizar la lógica común de obtención por ID.
 */
export class DeviceGetter extends GetBaseService<Primitives<DeviceId>, DeviceDto> {}