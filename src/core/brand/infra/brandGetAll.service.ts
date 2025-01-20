import { fetching } from '@/api/api'
import { type BrandGetAllRepository } from '../domain/repository/BrandGetAllRepository'
import { type BrandDTO } from '../domain/dto/Brand.dto'
import { brandUrl } from '../domain/entity/baseUrl'

export class BrandGetAllService implements BrandGetAllRepository {
  async getAll(): Promise<BrandDTO[]> {
    return await fetching<BrandDTO[]>({ url: brandUrl, method: 'GET' })
  }
}
