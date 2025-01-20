import { fetching } from '@/api/api'
import { type LocationGetAllRepository } from '../domain/repository/LocationGetAllRepository'
import { type LocationDto } from '../domain/dto/Location.dto'
import { locationUrl } from '../domain/entity/baseUrl'

export class LocationGetAllService implements LocationGetAllRepository {
  async getAll(): Promise<LocationDto[]> {
    return await fetching<LocationDto[]>({ url: locationUrl, method: 'GET' })
  }
}
