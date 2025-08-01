import { GetAllRepository } from '@/entities/shared/domain/repository/GetAllRepository.abstract'
import { InputTypeDto } from '../dto/InputType.dto'

export abstract class InputTypeGetAllRepository extends GetAllRepository<InputTypeDto> {}
