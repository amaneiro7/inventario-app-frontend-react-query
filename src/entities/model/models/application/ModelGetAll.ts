import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type ModelDto } from '../domain/dto/Model.dto'

export class ModelGetAll extends GetAllBaseService<ModelDto> {}
