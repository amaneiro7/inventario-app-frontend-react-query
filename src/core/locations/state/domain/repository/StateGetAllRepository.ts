import { GetAllRepository } from '@/core/shared/domain/repository/GetAllRepository.abstract'
import { type StateDto } from '../dto/State.dto'

export abstract class StateGetAllRepository extends GetAllRepository<StateDto> {}
