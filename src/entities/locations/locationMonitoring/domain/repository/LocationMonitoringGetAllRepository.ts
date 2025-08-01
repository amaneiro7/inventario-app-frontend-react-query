import { type LocationMonitoringDto } from '../dto/LocationMonitoring.dto'
import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'

export abstract class LocationMonitoringGetAllRepository extends GetAllRepository<LocationMonitoringDto> {}
