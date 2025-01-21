import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { OperatingSystemArqDto } from '../dto/OperatingSystemArq.dto'

export abstract class OperatingSystemArqGetAllRepository extends GetAllRepository<OperatingSystemArqDto> {}
