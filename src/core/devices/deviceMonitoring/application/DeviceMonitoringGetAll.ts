import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type DeviceMonitoringDto } from '../domain/dto/DeviceMonitoring.dto'

export class DeviceMonitoringGetAll extends GetAllBaseService<DeviceMonitoringDto> {}
