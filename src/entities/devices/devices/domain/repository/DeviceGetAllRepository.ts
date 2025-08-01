import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type DeviceDto } from '../dto/Device.dto'

export abstract class DeviceGetAllRepository extends GetAllRepository<DeviceDto> {}
