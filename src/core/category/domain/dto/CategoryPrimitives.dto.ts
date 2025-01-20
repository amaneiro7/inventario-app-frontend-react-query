import { type Primitives } from "@/core/shared/domain/value-objects/Primitives"
import { type CategoryName } from "../value-object/CategoryName"

export interface CategoryPrimitives {
    name: Primitives<CategoryName>
}