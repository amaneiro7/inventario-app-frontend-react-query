import { type Primitives } from "@/core/shared/domain/value-objects/Primitives"
import { type BrandName } from "../value-object/BrandName"

export interface BrandPrimitives {
    name: Primitives<BrandName>
}