import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type StateDto } from '../domain/dto/State.dto'

export class StateGetAll extends GetAllBaseService<StateDto> {}
