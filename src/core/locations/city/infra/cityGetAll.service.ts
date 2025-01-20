import { fetching } from '@/api/api'
import { type CityGetAllRepository } from '../domain/repository/CityGetAllRepository'
import { type CityDto } from '../domain/dto/City.dto'
import { cityUrl } from '../domain/entity/baseUrl'

export class CityGetAllService implements CityGetAllRepository {
  async getAll(): Promise<CityDto[]> {
    return await fetching<CityDto[]>({ url: cityUrl, method: 'GET' })
  }
}
