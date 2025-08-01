import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type DirectivaDto } from '../domain/dto/Directiva.dto'

export class DirectivaGetAll extends GetAllBaseService<DirectivaDto> {}
