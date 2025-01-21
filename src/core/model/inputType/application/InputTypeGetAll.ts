import { GetAllBaseService } from '@/core/shared/domain/methods/getAll.abstract'
import { type InputTypeDto } from '../domain/dto/InputType.dto'

export class InputTypeGetAll extends GetAllBaseService<InputTypeDto> {}
