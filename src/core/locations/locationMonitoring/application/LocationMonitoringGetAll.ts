import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type LocationMonitoringDto } from '../domain/dto/LocationMonitoring.dto'

export class LocationMonitoringGetAll extends GetAllBaseService<LocationMonitoringDto> {}
