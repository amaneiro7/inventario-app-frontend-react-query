import { fetching } from '@/api/api'
import { type StateGetAllRepository } from '../domain/repository/StateGetAllRepository'
import { type StateDto } from '../domain/dto/State.dto'
import { stateUrl } from '../domain/entity/baseUrl'

export class StateGetAllService implements StateGetAllRepository {
  async getAll(): Promise<StateDto[]> {
    return await fetching<StateDto[]>({ url: stateUrl, method: 'GET' })
  }
}
