import { fetching } from '@/api/api'
import { brandUrl } from '../domain/entity/baseUrl'
import { type BrandGetRepository } from '../domain/repository/BrandGetRepository'
import { type BrandDto } from '../domain/dto/Brand.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type BrandId } from '../domain/value-object/BrandId'

export class BrandGetService implements BrandGetRepository {
  async getById({ id }: { id: Primitives<BrandId> }): Promise<BrandDto> {
    return await fetching<BrandDto>({
      url: brandUrl,
      method: 'GET',
      params: id
    })
  }
}
