import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { type DirectivaDto } from '../dto/Directiva.dto'

export abstract class DirectivaGetAllRepository extends GetAllRepository<DirectivaDto> {}
