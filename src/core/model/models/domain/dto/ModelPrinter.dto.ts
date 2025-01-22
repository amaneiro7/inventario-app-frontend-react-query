import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import {
	type ModelDto,
	type ModelParams,
	type ModelPrimitives,
	type Model
} from './Model.dto'
import { type CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { type CartridgeModel } from '../value-object/CartridgeModel'
import { MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'

export interface ModelPrinter extends Model {
	cartridgeModel: Primitives<CartridgeModel>
}

export type ModelPrinterPrimitives = ModelPrimitives & {
	cartridgeModel: Primitives<CartridgeModel>
}

export type ModelPrinterParams = ModelParams & {
	mainCategoryId: MainCategoryOptions.PRINTERS
	categoryId: CategoryOptions.INKPRINTER | CategoryOptions.LASERPRINTER
	cartridgeModel: Primitives<CartridgeModel>
}

export type ModelPrinterDto = ModelDto & {
	categoryId: CategoryOptions.INKPRINTER | CategoryOptions.LASERPRINTER
	cartridgeModel: Primitives<CartridgeModel>
}
