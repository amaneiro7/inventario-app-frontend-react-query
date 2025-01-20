import { GetAllBaseService } from "@/core/shared/domain/methods/getAll.abstract"
import { type MainCategoryDTO } from "../domain/dto/MainCategory.dto"

export class MainCategoryGetAll extends GetAllBaseService<MainCategoryDTO> { }