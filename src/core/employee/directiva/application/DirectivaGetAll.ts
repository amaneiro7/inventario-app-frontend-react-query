import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type DirectivaDto } from '../domain/dto/Directiva.dto'

export class DirectivaGetAll extends GetAllBaseService<DirectivaDto> {}
