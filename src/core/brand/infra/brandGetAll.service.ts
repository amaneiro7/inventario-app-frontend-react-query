import { fetching } from '@/api/api'
import { type BrandGetAllRepository } from '../domain/repository/BrandGetAllRepository'
import { type BrandDto } from '../domain/dto/Brand.dto'
import { brandUrl } from '../domain/entity/baseUrl'

export class BrandGetAllService implements BrandGetAllRepository {
  async getAll(): Promise<BrandDto[]> {
    return await fetching<BrandDto[]>({ url: brandUrl, method: 'GET' })
  }
}
