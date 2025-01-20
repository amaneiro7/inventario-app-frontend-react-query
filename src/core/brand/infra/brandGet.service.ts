import { fetching } from "@/api/api"
import { type BrandGetRepository } from "../domain/repository/BrandGetRepository"
import { type BrandDTO } from "../domain/dto/Brand.dto"
import { type Primitives } from "@/core/shared/domain/value-objects/Primitives"
import { type BrandId } from "../domain/value-object/BrandId"

export class BrandGetService implements BrandGetRepository {
    async getById({ id }: { id: Primitives<BrandId> }): Promise<BrandDTO> {
        return await fetching<BrandDTO>({ url: `brands/${id}`, method: 'GET' })
    }
}