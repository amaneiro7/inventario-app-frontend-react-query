import { fetching } from "@/api/api"
import { type MainCategoryGetAllRepository } from "../domain/repository/MainCategoryGetAllRepository"
import { type MainCategoryDTO } from "../domain/dto/MainCategory.dto"

export class MainCategoryGetAllService implements MainCategoryGetAllRepository {
    async getAll(): Promise<MainCategoryDTO[]> {
        return await fetching<MainCategoryDTO[]>({ url: 'maincategories', method: 'GET' })
    }
}