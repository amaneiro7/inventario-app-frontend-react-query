import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DeviceDto } from '../domain/dto/Device.dto'
import { type DeviceId } from '../domain/value-object/DeviceId'
import { GetBaseService } from '@/core/shared/domain/methods/getter.abstract'

export class DeviceGetter extends GetBaseService<Primitives<DeviceId>, DeviceDto> {}
