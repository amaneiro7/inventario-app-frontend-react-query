import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ModelParams, type ModelPrimitives } from './Model.dto'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { type CartridgeModel } from '../value-object/CartridgeModel'
import { type MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'

export type ModelPrinterPrimitives = ModelPrimitives & {
	cartridgeModel: Primitives<CartridgeModel>
}

export type ModelPrinterParams = ModelParams & {
	mainCategoryId: MainCategoryOptions.PRINTERS
	categoryId: CategoryOptions.INKPRINTER | CategoryOptions.LASERPRINTER
	cartridgeModel: Primitives<CartridgeModel>
}

export interface ModelPrinterDto {
	cartridgeModel: Primitives<CartridgeModel>
}
