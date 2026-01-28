import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { InputTypeDto } from '../dto/InputType.dto'

/**
 * Abstract class for a repository that provides methods for retrieving all InputType entities.
 * It extends the generic `GetAllRepository` with `InputTypeDto` as the type parameter.
 */
export abstract class InputTypeGetAllRepository extends GetAllRepository<InputTypeDto> {}
