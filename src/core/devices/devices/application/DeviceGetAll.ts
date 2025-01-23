import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type DeviceDto } from '../domain/dto/Device.dto'

export class DeviceGetAll extends GetAllBaseService<DeviceDto> {}
