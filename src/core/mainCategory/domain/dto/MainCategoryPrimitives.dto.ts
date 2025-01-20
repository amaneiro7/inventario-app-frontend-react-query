import { type Primitives } from "@/core/shared/domain/value-objects/Primitives"
import { type MainCategoryName } from "../value-object/MainCategoryName"

export interface MainCategoryPrimitives {
    name: Primitives<MainCategoryName>
}