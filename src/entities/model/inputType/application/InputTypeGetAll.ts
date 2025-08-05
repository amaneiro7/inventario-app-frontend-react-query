import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type InputTypeDto } from '../domain/dto/InputType.dto'

/**
 * Service class for retrieving all InputType entities.
 * It extends GetAllBaseService, providing generic functionality for fetching all records
 * of type InputTypeDto.
 */
export class InputTypeGetAll extends GetAllBaseService<InputTypeDto> {}