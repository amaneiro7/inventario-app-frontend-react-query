import { fetching } from "@/api/api"
import { type BrandSaveRepository } from "../domain/repository/BrandSaveRepository"
import { type BrandPrimitives } from "../domain/dto/BrandPrimitives.dto"

export class BrandSaveService implements BrandSaveRepository {
    async save({ payload }: { payload: BrandPrimitives; }): Promise<{ message: string; }> {
        return await fetching({ method: 'POST', url: 'brands', data: payload })
    }

    async update({ id, payload }: { id: string; payload: BrandPrimitives; }): Promise<{ message: string; }> {
        return await fetching({ method: 'PATCH', url: `brands/${id}`, data: payload, })
    }
}