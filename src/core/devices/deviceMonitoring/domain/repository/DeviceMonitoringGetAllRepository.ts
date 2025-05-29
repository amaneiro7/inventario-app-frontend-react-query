import { type DeviceMonitoringDto } from '../dto/DeviceMonitoring.dto'
import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'

export abstract class DeviceMonitoringGetAllRepository extends GetAllRepository<DeviceMonitoringDto> {}
