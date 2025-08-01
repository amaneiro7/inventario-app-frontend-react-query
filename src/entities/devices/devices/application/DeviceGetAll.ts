import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type DeviceDto } from '../domain/dto/Device.dto'

export class DeviceGetAll extends GetAllBaseService<DeviceDto> {}
